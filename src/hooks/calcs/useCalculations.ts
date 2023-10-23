 
import { Exchange } from "@zetamarkets/sdk";
import { ProgramAccountType } from "@zetamarkets/sdk/dist/types";
import { convertNativeBNToDecimal } from "@zetamarkets/sdk/dist/utils";
import { useCallback } from "react";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useClientStore } from "stores";

export const useCalculations = () => {
  const client = useClientStore((state) => state.client);

  const getMarginAccountBalance = useCallback(() => {
    const marginAccount = client?.account;
    if (!marginAccount) return;

    const balance = marginAccount?.balance;
    if (!balance) return 0;
    return convertNativeBNToDecimal(balance);
  }, [client]);

  const getTotalUnrealizedPNL = useCallback(
    (asset: Asset) => {
      if (!client) return;

      // TODO: This code is gonna change with cross margin updates
      const marginAccount = client.account;
      if (!marginAccount) return;

      const marginAccountUnrealizedPNL =
        Exchange.riskCalculator.calculateUnrealizedPnl(
          marginAccount,
          ProgramAccountType.CrossMarginAccount
        );

      return marginAccountUnrealizedPNL.get(asset);
    },
    [client]
  );

  const getTotalMaintenanceMargin = useCallback(() => {
    const marginAccount = client?.account;

    if (!marginAccount) return;

    return Exchange.riskCalculator.getCrossMarginAccountState(marginAccount)
      .maintenanceMarginTotal;
  }, [client]);

  /**
   * Liquidation price of provided asset
   */
  const getLiquidationPrice = useCallback(
    (asset: Asset, signedPosition: number) => {
      const marginAccount = client?.account;

      if (!marginAccount) return;

      return Exchange.riskCalculator.getLiquidationPrice(
        asset,
        signedPosition,
        marginAccount
      );
    },
    [client?.account]
  );

  /**
   * getPlatformFees needed by getMaxTradeSize
   * @param contract Passed in to calculate platform fees of specific contract.
   */

  // const getMaxCloseSize = useCallback(
  //   (market: Market, quoteInput: Level, position: Position) => {
  //     // const marginAccount = client?.getMarginAccount(market?.asset);
  //     const marginAccount = client?.account;

  //     if (!marginAccount) return;

  //     const { size } = position;
  //     // On program the instant pnl only looks at negative and is relative to mark

  //     const markPrice = Exchange.getMarkPrice(market.asset);

  //     // PNL RELATIVE TO MARK - used for instantaneous PnL
  //     const markRelPnl =
  //       size > 0 ? quoteInput.price - markPrice : markPrice - quoteInput.price;

  //     // Instant pnl given that 0 is upper bound (we don't count instant positive PnL)
  //     const instantPnl = Math.abs(Math.min(0, markRelPnl));

  //     const maxPlatformFees =
  //       getPlatformFees(quoteInput.size, market.asset) || 0;
  //     const feePerContract = maxPlatformFees / Math.abs(size);

  //     // This is your trading buffer solve max size for when this = 0.

  //     const marginAccountBalance =
  //       useCalculationStore.getState().marginAccountBalance;
  //     const maintMarginInclOrders =
  //       useCalculationStore.getState().maintMarginInclOrders;
  //     // IS THIS CORRECT - unrealisedPnl === getTotalUnrealizedPNL
  //     const unrealisedPnl = useCalculationStore.getState().unrealizedPnl;

  //     if (
  //       marginAccountBalance === undefined ||
  //       maintMarginInclOrders === undefined ||
  //       unrealisedPnl === undefined
  //     )
  //       return;

  //     const availClosingBal =
  //       marginAccountBalance - maintMarginInclOrders + unrealisedPnl;

  //     // Cost of closing trade is you PnL + fees (both are costs as we only consider pnl when negative)
  //     const costOfClosingTrade = feePerContract + instantPnl;

  //     // To handle scenario where cost of trades is 0 (positive pnl + no fees) if 0 set amount to position size.
  //     const closableAmount =
  //       costOfClosingTrade > 0
  //         ? (availClosingBal / costOfClosingTrade) * 0.975
  //         : Math.abs(size);

  //     /* IS THIS CORRECT - updated utils.getProductLedger to use client.getProductLedger
  //      * BUT it returns ProductLedger from program-types.d.ts instead of number
  //      * with the following properties:
  //      * position: Position;
  //      * orderState: OrderState;
  //      */
  //     // const currPosition = utils.getProductLedger(marginAccount, marketIndex);
  //     const currPosition = client?.getProductLedger(market.asset);
  //     const closingOrders = convertNativeLotSizeToDecimal(
  //       currPosition?.orderState.closingOrders.toNumber()
  //     );

  //     return maxPlatformFees
  //       ? Math.max(Math.min(closableAmount, Math.abs(size)) - closingOrders, 0)
  //       : Math.abs(size) - closingOrders;
  //   },
  //   [client, getPlatformFees]
  // );

  return {
    getMarginAccountBalance,
    getTotalMaintenanceMargin,
    getTotalUnrealizedPNL,
    getLiquidationPrice,
    // getMaxCloseSize,
  };
};
