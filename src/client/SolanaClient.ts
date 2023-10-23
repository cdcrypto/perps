/* eslint-disable no-useless-catch */
import { NotificationInterface } from "@components/Notification/useNotification";
import { PublicKey } from "@solana/web3.js";
import { MAX_LOT_SIZE_PRECISION } from "@utils/constants";
import { CrossClient, constants } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import {
  Level,
  Order,
  OrderType,
  Side,
  TriggerDirection,
  TriggerOrder,
} from "@zetamarkets/sdk/dist/types";
import { DEX_ERRORS, NativeAnchorError } from "@zetamarkets/sdk/dist/errors";
import {
  convertDecimalToNativeInteger,
  convertDecimalToNativeLotSize,
  convertNativeIntegerToDecimal,
  convertNativeLotSizeToDecimal,
} from "@zetamarkets/sdk/dist/utils";
import { analytics } from "analytics";
import BN from "bn.js";
import { ClientTransactions, TxId } from "client/Client";
import { SyntheticOrderType } from "stores/useSelectedContract";
import {
  adjustOrderPriceForSlippage,
  checkIfClosingPosition,
  convertDollarNumberToString,
  convertNumberToString,
  convertToSignedSize,
  formatAssetPrice,
  getTriggerOrderDescription,
  getTriggerOrderStr,
} from "@utils/general";

const isObject = (o: unknown): o is Record<string, unknown> =>
  typeof o === "object" && o !== null;

// Since error coming from SDK is not a native error, we need to check if it is has necessary properties
const isAnchorError = (o: unknown): o is NativeAnchorError =>
  isObject(o) && "msg" in o && "code" in o;

const transactionErrorGetter =
  (message = "%error%", defaultMessage = "Please try again") =>
  (o: unknown) => {
    console.log("Transaction error:", o);
    if (isAnchorError(o)) {
      const errorDetails = o.msg ? o.msg : DEX_ERRORS.get(o.code ?? -1);
      if (errorDetails) {
        return message.replace("%error%", errorDetails);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const strError = isObject(o) ? o.toString().toLowerCase() : "";

    if (strError.includes("user") && strError.includes("reject")) {
      return "Transaction rejected by user";
    }
    return defaultMessage;
  };

const commonTxDigestGetter = (data: unknown) => {
  if (typeof data === "string") {
    // Digest is a string
    return data;
  }
  return undefined;
};

const ORDER_TYPES: Record<SyntheticOrderType, string> = {
  [SyntheticOrderType.LIMIT]: "Limit",
  [SyntheticOrderType.MARKET]: "Market",
  [SyntheticOrderType.POSTONLY]: "Post-Only",
  [SyntheticOrderType.POSTONLYSLIDE]: "Post-Only",
  [SyntheticOrderType.IMMEDIATEORCANCEL]: "IoC",
  [SyntheticOrderType.FILLORKILL]: "FoK",
};

export class SolanaClient implements ClientTransactions {
  constructor(
    private client: CrossClient,
    private notification: NotificationInterface,
    private marketOrderSlippage: number
  ) {}

  // TODO: this should take in price, size instead of an level object
  async placeOrder(
    level: Level,
    side: Side,
    asset: Asset,
    orderType: SyntheticOrderType,
    reduceOnly: boolean
  ): Promise<TxId> {
    let isClose = false;
    const position = (this.client.positions.get(asset) ?? [])[0];
    if (position?.size) {
      const size = position.size;
      if (size) {
        const positionSide = size > 0 ? Side.BID : Side.ASK;
        isClose = positionSide !== side;
      }
    }
    let price = level.price;

    const signedOrderSize = convertToSignedSize(level.size, side);
    const isClosingPosition = checkIfClosingPosition(
      this.client.getPositionSize(asset, true),
      signedOrderSize
    );
    const hasTriggerOrders = this.client.getTriggerOrders(asset).length > 0;

    if (isClosingPosition && hasTriggerOrders) {
      const txIds = await this.cancelAllTriggerOrdersAndPlaceOrder(
        asset,
        price,
        level.size,
        side,
        orderType
      );
      return txIds[txIds.length - 1];
    }

    // The sdk isn't aware of a Market order
    const convertedOrderType =
      orderType === SyntheticOrderType.MARKET
        ? OrderType.IMMEDIATEORCANCEL
        : (orderType as unknown as OrderType);

    // See `useMarketOrdersSetup()` for more details on how the market price is set
    if (orderType === SyntheticOrderType.MARKET) {
      price = adjustOrderPriceForSlippage(
        price,
        this.marketOrderSlippage,
        side
      );
    }

    const priceStr = convertDollarNumberToString(price);
    const description = `${this.getOrderDescription(side, level.size, asset)} ${
      orderType !== SyntheticOrderType.MARKET ? `at ${priceStr}` : ""
    }`;

    const orderTypeStr = isClose ? "Closing" : ORDER_TYPES[orderType] ?? "";
    try {
      const promise = this.client.placeOrder(
        asset,
        convertDecimalToNativeInteger(price),
        convertDecimalToNativeLotSize(level.size),
        side,
        {
          orderType: convertedOrderType,
          tifOptions: {},
          tag: "DEX",
          reduceOnly,
        }
      );

      let txId: string;
      if (orderType === SyntheticOrderType.MARKET) {
        txId = await promise;
      } else {
        txId = await this.notification.promise({
          promise,
          text: {
            loading: {
              header: `Placing ${orderTypeStr} Order`,
              body: description,
            },
            success: {
              header: `${orderTypeStr} Order Placed`,
              body: description,
            },
            error: {
              header: `Error Placing ${orderTypeStr} Order`,
              body: transactionErrorGetter(),
            },
          },
          txDigestGetter: commonTxDigestGetter,
        });
      }

      analytics.placeOrder(level.price, level.size, asset, orderType, txId);

      return txId;
    } catch (error) {
      analytics.placeOrder(level.price, level.size, asset, orderType);
      throw error;
    }
  }

  /**
   *
   * @param asset             The asset to create the trigger order on
   * @param side              The side of the order
   * @param size              The size of the order
   * @param slippage          The acceptable slippage in price as a DECIMAL value, 1% -> 0.01
   * @param triggerPrice      The price that the order will be triggered at
   * @param triggerDirection  The trigger direction for the order
   * @param orderPrice        The price at which the asset will be bought or sold
   * @returns                 The transaction ID
   */
  async placeTriggerOrder(
    asset: Asset,
    side: Side,
    size: number,
    triggerPrice: number,
    triggerDirection: TriggerDirection,
    slippage = this.marketOrderSlippage,
    orderPrice = triggerPrice
  ) {
    const isLong = this.client.getPositionSize(asset) > 0;
    const triggerOrderStr = getTriggerOrderStr(triggerDirection, isLong);
    const triggerOrderDescription = getTriggerOrderDescription(
      triggerDirection,
      asset,
      size,
      triggerPrice,
      isLong
    );
    orderPrice = adjustOrderPriceForSlippage(orderPrice, slippage, side);

    try {
      const txId = await this.notification.promise({
        promise: this.client.placePriceTriggerOrder(
          asset,
          convertDecimalToNativeInteger(orderPrice),
          convertDecimalToNativeInteger(triggerPrice),
          convertDecimalToNativeLotSize(size),
          side,
          undefined,
          triggerDirection
        ),
        text: {
          loading: {
            header: `Placing ${triggerOrderStr} Order`,
            body: triggerOrderDescription,
          },
          success: {
            header: `${triggerOrderStr} Order Placed`,
            body: triggerOrderDescription,
          },
          error: {
            header: `Error Placing ${triggerOrderStr} Order`,
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txId;
    } catch (error) {
      throw error;
    }
  }

  async cancelTriggerOrder(triggerOrder: TriggerOrder) {
    const { asset, size, triggerDirection, triggerPrice } = triggerOrder;
    const isLong = this.client.getPositionSize(asset) > 0;
    const triggerOrderStr = getTriggerOrderStr(
      triggerDirection ?? TriggerDirection.GREATERTHANOREQUAL,
      isLong
    );
    const triggerOrderDescription = getTriggerOrderDescription(
      triggerDirection ?? TriggerDirection.GREATERTHANOREQUAL,
      asset,
      convertNativeLotSizeToDecimal(size),
      convertNativeIntegerToDecimal(triggerPrice ?? 0),
      isLong
    );

    try {
      const txId = await this.notification.promise({
        promise: this.client.cancelTriggerOrder(triggerOrder.triggerOrderBit),
        text: {
          loading: {
            header: `Cancelling ${triggerOrderStr} Order`,
            body: triggerOrderDescription,
          },
          success: {
            header: `${triggerOrderStr} Order Cancelled`,
            body: `${triggerOrderDescription} order cancelled`,
          },
          error: {
            header: `Error Placing ${triggerOrderStr} Order`,
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txId;
    } catch (error) {
      throw error;
    }
  }

  async cancelAllTriggerOrders(asset?: Asset) {
    let txIds: string[] | undefined = undefined;

    try {
      const assetStr = asset ? `${asset} ` : "";

      txIds = await this.notification.promise({
        promise: this.client.cancelAllTriggerOrders(asset),
        text: {
          loading: { header: `Cancelling ${assetStr}TP/SL Orders`, body: "" },
          success: {
            header: `All ${assetStr}TP/SL Orders Cancelled`,
            body: `You have no open ${assetStr}TP/SL orders`,
          },
          error: {
            header: `Error Cancelling ${assetStr}TP/SL Orders`,
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txIds;
    } catch (error) {
      throw error;
    }
  }

  async cancelAllTriggerOrdersAndPlaceOrder(
    asset: Asset,
    price: number,
    size: number,
    side: Side,
    orderType: SyntheticOrderType = SyntheticOrderType.MARKET
  ) {
    let convertedOrderType = undefined;

    // TODO: Refactor this at some point
    if (orderType === SyntheticOrderType.LIMIT) {
      convertedOrderType = OrderType.LIMIT;
    } else if (orderType === SyntheticOrderType.MARKET) {
      price = adjustOrderPriceForSlippage(
        price,
        this.marketOrderSlippage,
        side
      );
    }

    const description = `${this.getOrderDescription(
      side,
      size,
      asset
    )} at ${formatAssetPrice(asset, price, true)}`;

    try {
      const tx = await this.notification.promise({
        promise: this.client.cancelAllTriggerOrdersAndPlaceOrder(
          asset,
          convertDecimalToNativeInteger(price),
          convertDecimalToNativeLotSize(size),
          side,
          {
            orderType: convertedOrderType,
            tifOptions: {},
            tag: "DEX",
          }
        ),
        text: {
          loading: {
            header: `Cancelling all ${asset} TP/SL Orders and Placing Order`,
            body: description,
          },
          success: {
            header: `All ${asset} TP/SL Orders Cancelled and Placed Order`,
            body: description,
          },
          error: {
            header: "Error Closing Position",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return tx;
    } catch (error) {
      throw error;
    }
  }

  async editPriceTriggerOrder(
    orderIndex: number,
    newTriggerPrice: number,
    newSize: number,
    newSide: Side,
    newOrderPrice = newTriggerPrice
  ) {
    const triggerOrder = this.client.getTriggerOrder(orderIndex);
    const { asset, triggerDirection } = triggerOrder;
    const slippage = this.marketOrderSlippage;

    const isLong = this.client.getPositionSize(asset) > 0;
    const triggerOrderStr = getTriggerOrderStr(triggerDirection, isLong);
    const triggerOrderDescription = getTriggerOrderDescription(
      triggerDirection,
      asset,
      newSize,
      newTriggerPrice,
      isLong
    );
    newOrderPrice = adjustOrderPriceForSlippage(
      newOrderPrice,
      slippage,
      newSide
    );

    try {
      const txId = await this.notification.promise({
        promise: this.client.editPriceTriggerOrder(
          orderIndex,
          convertDecimalToNativeInteger(newOrderPrice),
          convertDecimalToNativeInteger(newTriggerPrice),
          convertDecimalToNativeLotSize(newSize),
          newSide
        ),
        text: {
          loading: {
            header: `Editing ${triggerOrderStr} Order`,
            body: triggerOrderDescription,
          },
          success: {
            header: `${triggerOrderStr} Order Edited`,
            body: triggerOrderDescription,
          },
          error: {
            header: `Error Editing ${triggerOrderStr} Order`,
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txId;
    } catch (error) {
      throw error;
    }
  }

  async cancelAndPlaceOrder(
    level: Level,
    side: Side,
    asset: Asset,
    orderId: BN
  ): Promise<TxId> {
    let txid: string | undefined = undefined;
    try {
      const priceStr = convertDollarNumberToString(level.price);

      const description = `${this.getOrderDescription(
        side,
        level.size,
        asset
      )} at ${priceStr}`;

      const editOrderPromise = this.client.cancelAndPlaceOrder(
        asset,
        orderId,
        side,
        convertDecimalToNativeInteger(level.price),
        convertDecimalToNativeLotSize(level.size),
        side
      );
      txid = await this.notification.promise<string>({
        promise: editOrderPromise,
        text: {
          loading: { header: "Editing Order", body: description },
          success: { header: "Order Edited", body: description },
          error: {
            header: "Error Editing Order",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txid;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(order: Order): Promise<TxId> {
    const { side, orderId, asset, size, price } = order;

    const priceStr = convertDollarNumberToString(price);

    let txid: string | undefined = undefined;

    const description = `${this.getOrderDescription(
      side,
      size,
      asset
    )} at ${priceStr}`;

    try {
      const cancelOrderPromise = this.client.cancelOrder(asset, orderId, side);

      txid = await this.notification.promise<string>({
        promise: cancelOrderPromise,
        text: {
          loading: { header: "Cancelling Order", body: `${description}` },
          success: {
            header: "Order Cancelled",
            body: `${description} order cancelled.`,
          },
          error: {
            header: "Error Cancelling Order",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      analytics.cancelOrder(order, txid);

      return txid;
    } catch (error) {
      analytics.cancelOrder(order);
      throw error;
    }
  }

  async cancelAllOrders(): Promise<TxId> {
    // Implement logic for canceling all perpetual market orders
    let txid: string | undefined = undefined;
    try {
      const cancelAllPromise = this.client.cancelAllMarketOrders();
      txid = await this.notification.promise<string>({
        promise: cancelAllPromise,
        text: {
          loading: { header: "Cancelling All Orders", body: "" },
          success: {
            header: "All Orders Cancelled",
            body: "You have no open orders.",
          },
          error: {
            header: "Error Cancelling All Orders",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      analytics.cancelAllOrders(txid);
      return txid;
    } catch (error) {
      analytics.cancelAllOrders();
      throw error;
    }
  }

  // TODO: Check if this can be decprecated.
  async cancelAllAssetOrders(asset: Asset): Promise<TxId> {
    let txid: string | undefined = undefined;
    try {
      const cancelAllPromise = this.client.cancelMarketOrders(asset);
      txid = await this.notification.promise<string>({
        promise: cancelAllPromise,
        text: {
          loading: { header: "Cancelling All Orders", body: "" },
          success: {
            header: "All Orders Cancelled",
            body: "You have no open orders.",
          },
          error: {
            header: "Error Cancelling All Orders",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      return txid;
    } catch (error) {
      throw error;
    }
  }

  async withdrawAndCloseMarginAccount(): Promise<TxId> {
    let txid: string | undefined = undefined;
    try {
      const closeMarginAccPromise = this.client.withdrawAndCloseAccount();

      txid = await this.notification.promise<string>({
        promise: closeMarginAccPromise,
        text: {
          loading: { header: "Closing Margin Account", body: "" },
          success: { header: "Margin Account Closed", body: "" },
          error: {
            header: "Error Closing Margin Account",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });
      return txid;
    } catch (error) {
      throw error;
    }
  }

  async closeMultipleOpenOrdersAccount(assets: Asset[]): Promise<TxId[]> {
    const description = "this is a temporary description";

    try {
      const txids = await this.notification.promise({
        promise: this.client.closeMultipleOpenOrdersAccount(assets),
        text: {
          loading: { header: "Closing open orders account", body: description },
          success: { header: "Closed open orders account", body: description },
          error: {
            header: "Error closing open orders account",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });
      // TODO: Figure out how to handle notification for individual txids
      // for (let i = 0; i < txids.length; i++) {
      //   pendingNotification({
      //     title: `${ t("OPEN_ORDERS_ACCOUNT_CLOSED") } (${ i + 1 } /${
      //       txids.length
      //     })`,
      //     txid: txids[i],
      //   });
      // }
      return txids;
    } catch (error) {
      console.error("Failed to cancel open order accounts: ", error);
      throw error;
    }
  }

  async initializeReferrerAccount(): Promise<void> {
    // Implement logic for initializing a referrer account
    await this.client.initializeReferrerAccount();
  }

  async setReferralData(): Promise<void> {
    // Implement logic for setting referral data
    await this.client.setReferralData();
    await this.client.updateState();

    // const isReferrer = this.client.referrerAccount !== null;
    // const isReferral = this.client.referralAccount !== null;

    // TODO: Add in after zustand is integrated for referral status.
    // if (!isReferrer && !isReferral) {
    //   setReferralStatus(ReferralStatus.UNREFERRdED);
    // } else if (!isReferrer) {
    //   setReferralStatus(ReferralStatus.REFERRAL);
    // } else if (!isReferral) {
    //   setReferralStatus(ReferralStatus.REFERRER);
    // } else {
    //   setReferralStatus(ReferralStatus.REFERRALREFERRER);
    // }
  }

  async referUser(referrerCode: PublicKey): Promise<string> {
    // Implement logic for referring a user
    const txid = await this.client.referUser(referrerCode);
    return txid;
  }

  async initializeReferrerAlias(newAlias: string): Promise<string> {
    const txid = await this.client.initializeReferrerAlias(newAlias);
    return txid;
  }

  async deposit(amount: number): Promise<TxId> {
    const formattedAmount = convertDollarNumberToString(
      amount,
      2,
      constants.PLATFORM_PRECISION
    );
    const convertedAmount = convertDecimalToNativeInteger(amount, 10 ** 0);
    try {
      const txId = await this.notification.promise({
        promise: this.client.deposit(convertedAmount),
        text: {
          loading: {
            header: "Depositing Funds",
            body: `${formattedAmount} being deposited into your account.`,
          },
          success: {
            header: "Deposited Funds",
            body: `You've deposited ${formattedAmount} into your account.`,
          },
          error: {
            header: "Error Depositing Funds",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      analytics.submitDeposit(amount, txId);

      return txId;
    } catch (error) {
      analytics.submitDeposit(amount);
      throw error;
    }
  }

  async withdraw(amount: number): Promise<TxId> {
    const formattedAmount = convertDollarNumberToString(
      amount,
      2,
      constants.PLATFORM_PRECISION
    );

    let txid: string | undefined = undefined;
    const convertedAmount = convertDecimalToNativeInteger(amount, 10 ** 0);
    try {
      txid = await this.notification.promise<string>({
        promise: this.client.withdraw(convertedAmount),
        text: {
          loading: {
            header: "Withdrawing Funds",
            body: `${formattedAmount} being withdrawn from your account.`,
          },
          success: {
            header: "Withdrawn Funds",
            body: `You've withdrawn ${formattedAmount} from your account.`,
          },
          error: {
            header: "Error Withdrawing Funds",
            body: transactionErrorGetter(),
          },
        },
        txDigestGetter: commonTxDigestGetter,
      });

      analytics.submitWithdraw(amount, txid);

      return txid;
    } catch (error) {
      analytics.submitWithdraw(amount);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  private getOrderDescription(side: Side, size: number, asset: Asset) {
    const sideStr = side === Side.ASK ? "Sell" : "Buy";
    const sizeStr = convertNumberToString(size, 0, MAX_LOT_SIZE_PRECISION);

    return `${sideStr} ${sizeStr} ${asset}-PERP`;
  }

  setMarketOrderSlippage(slippage: number) {
    this.marketOrderSlippage = slippage;
  }
}
