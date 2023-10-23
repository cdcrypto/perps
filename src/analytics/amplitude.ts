import { USDCWalletBalance } from "@hooks/api/useUsdcWalletBalance";
import { getFlatOrders } from "@hooks/client/useFlatOrders";
import { queryClient } from "@utils/setup/Root";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Order, Side } from "@zetamarkets/sdk/dist/types";
import {
  Ampli,
  CancelAllOrdersProperties,
  CancelOrderProperties,
  PlaceOrderProperties,
  SubmitDepositProperties,
  SubmitWithdrawalProperties,
  ampli,
} from "ampli";
import { AnalyticsActions } from "analytics";
import { AnalyticsLocation } from "analytics/interface";
import { useCalculationStore } from "stores";
import {
  SyntheticOrderType,
  useSelectedContractStore,
} from "stores/useSelectedContract";

export class AmplitudeClient implements AnalyticsActions {
  public isInitialized = false;
  public client: Ampli;

  constructor() {
    this.client = ampli;
    ampli
      .load({
        environment: import.meta.env.VITE_AMPLI_ENVIRONMENT,
        client: {
          configuration: {
            // Proxy through internal worker to avoid blocking by user trackers
            serverUrl:
              import.meta.env.VITE_AMPLI_ENVIRONMENT === "production"
                ? "https://amplitude.zetaplatform.workers.dev"
                : undefined,
          },
        },
      })
      .promise.then(() => {
        this.isInitialized = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  @checkIsInitialized
  public identify(wallets: string[], address?: string): void {
    this.client.identify(address, {
      has_solana_wallet_installed: wallets.length > 0,
      installed_solana_wallets: wallets,
    });
  }

  @checkIsInitialized
  public connectWallet(
    address: string,
    solBalance: number,
    usdcBalance: number,
    walletProvider: string
  ): void {
    this.client.connectWallet({
      sol_balance: solBalance,
      usdc_balance: usdcBalance ?? 0,
      wallet_address: address,
      wallet_provider: walletProvider,
    });
  }

  @checkIsInitialized
  public selectMarket(asset: Asset): void {
    this.client.selectMarket({
      is_favorite: false,
      product_type: "perp",
      underlying: asset,
    });
  }

  @checkIsInitialized
  public openDepositModal(location: AnalyticsLocation): void {
    this.client.openDepositModal({ location });
  }

  @checkIsInitialized
  public openWithdrawModal(location: AnalyticsLocation): void {
    this.client.openWithdrawModal({ location });
  }

  @checkIsInitialized
  public viewTcs(): void {
    this.client.viewConsentPane();
  }

  @checkIsInitialized
  public acceptTcs(): void {
    this.client.acceptConsentPane();
  }

  @checkIsInitialized
  public viewPositions(location: AnalyticsLocation): void {
    this.client.selectCurrentPositions({ path: location });
  }

  @checkIsInitialized
  public viewOpenOrders(location: AnalyticsLocation): void {
    this.client.selectOpenOrders({ path: location });
  }

  @checkIsInitialized
  public viewTradeHistory(location: AnalyticsLocation): void {
    this.client.selectTradeHistory({ path: location });
  }

  @checkIsInitialized
  public viewFundingHistory(location: AnalyticsLocation): void {
    this.client.selectFundingHistory({ path: location });
  }

  @checkIsInitialized
  public viewOrderbook(): void {
    this.client.selectOrderbook();
  }

  @checkIsInitialized
  public viewRecentTrades(): void {
    this.client.selectRecentTrades();
  }

  @checkIsInitialized
  public selectPriceGrouping(grouping: number): void {
    this.client.selectPriceGrouping({
      price_grouping: grouping,
      underlying:
        useSelectedContractStore.getState().market?.asset ?? Asset.SOL,
    });
  }

  @checkIsInitialized
  public viewTradePage(): void {
    this.client.viewTradePage({ path: "" });
  }

  @checkIsInitialized
  public viewAccountPage(): void {
    this.client.viewAccountPage({ path: "" });
  }

  @checkIsInitialized
  public submitDeposit(amount: number, tx?: string): void {
    const walletBalance =
      queryClient.getQueryData<USDCWalletBalance>(["usdc-wallet-balance"]) ?? 0;

    const props: SubmitDepositProperties = {
      amount: amount,
      margin_account: "",
      token: "USDC",
      wallet_amount: walletBalance,
      tx_signature: tx,
      deposit_capture_rate: amount / walletBalance || 0,
      is_successful: !!tx,
    };

    this.client.submitDeposit(props);
  }

  @checkIsInitialized
  public submitWithdraw(amount: number, tx?: string): void {
    const accBalance = useCalculationStore.getState().marginAccountBalance ?? 0;
    const props: SubmitWithdrawalProperties = {
      amount: amount,
      margin_account: "",
      token: "USDC",
      tx_signature: tx,
      is_account_closure: false,
      margin_account_balance: accBalance,
      withdrawal_loss_rate: amount / accBalance || 0,
      is_successful: !!tx,
    };

    this.client.submitWithdrawal(props);
  }

  @checkIsInitialized
  public cancelOrder(order: Order, tx?: string): void {
    const props: CancelOrderProperties = {
      amount_usd: order.size * order.price,
      order_id: order.orderId.toString(),
      price: order.price,
      size: order.size,
      tx_signature: tx,
      underlying: order.asset,
      side: order.side === Side.BID ? "buy" : "sell",
      is_successful: !!tx,

      // Redundant properties
      strike: 0,
      product_type: "perp",
      expiry: undefined,
    };

    this.client.cancelOrder(props);
  }

  @checkIsInitialized
  public cancelAllOrders(tx?: string): void {
    const orders = getFlatOrders();
    const props: CancelAllOrdersProperties = {
      num_orders_cancelled: orders.length,
      order_ids: orders.map((order) => order.orderId.toString()),
      tx_signature: tx,
      is_successful: !!tx,
    };

    this.client.cancelAllOrders(props);
  }

  @checkIsInitialized
  public placeOrder(
    price: number,
    size: number,
    asset: Asset,
    orderType: SyntheticOrderType,
    tx?: string
  ): void {
    let orderTypeStr;
    switch (orderType) {
      case SyntheticOrderType.MARKET:
      case SyntheticOrderType.LIMIT:
        orderTypeStr = "";
        break;
      case SyntheticOrderType.FILLORKILL:
        orderTypeStr = "fok";
        break;
      case SyntheticOrderType.POSTONLY:
        orderTypeStr = "post only";
        break;
      case SyntheticOrderType.POSTONLYSLIDE:
        orderTypeStr = "post only slide";
        break;
      case SyntheticOrderType.IMMEDIATEORCANCEL:
        orderTypeStr = "ioc";
    }

    const props: PlaceOrderProperties = {
      price: price,
      size: size,
      amount_usd: Math.abs(price * size),
      leverage: 0,
      is_successful: !!tx,
      order_type: orderType === SyntheticOrderType.MARKET ? "market" : "limit",
      order_trait: orderTypeStr,
      side: size > 0 ? "bid" : "ask",
      underlying: asset,
      tx_signature: tx,

      product_type: "perp",
    };

    this.client.placeOrder(props);
  }
}

function checkIsInitialized(
  _target: unknown,
  methodKey: string,
  descriptor: PropertyDescriptor
) {
  // Store the original method.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalMethod = descriptor.value;

  // Modify the descriptor value (the method) to check for the 'name' property before running.
  descriptor.value = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if ((this as any)["isInitialized"] === undefined) {
      console.warn(
        `Amplitude client has not been loaded. Method '${methodKey}' was not executed.`
      );
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
