import { useClient } from "@hooks/client/useClient";
import { checkLiquidity } from "@hooks/useLiquidityCheck";
import { useInterval } from "@hooks/utility/useInterval";
import { Exchange } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { CrossMarginAccount } from "@zetamarkets/sdk/dist/program-types";
import { Position, Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";
import { useCallback, useState } from "react";
import { useClientStore, useUserSettings } from "stores";

type MaxCloseSizeParams = {
  asset: Asset;
  /**
   * This is the ORIGINAL side of the EXISTING position you want to close
   */
  side: Side;
  /**
   * This is the user inputted price (or market price)
   */
  price: number;
  /**
   * This is the user inputted closing size
   */
  closeSize: number;
};

/**
 * 
 * @param MaxCloseSizeParams 
  ```
  {
    asset: Asset;
    // This is the ORIGINAL side of the EXISTING position you want to close
    side: Side;
    // This is the user inputted price (or market price)
    price: number;
    // This is the user inputted closing size. This number is UNSIGNED.
    closeSize: number;
  }
  ```
 * @param interval - how often to recalculate
 * @returns yo momma
 */
export const useMaxCloseSize = (
  { asset, side, price, closeSize }: MaxCloseSizeParams,
  interval: number | null
) => {
  const closingSide = side === Side.BID ? Side.ASK : Side.BID;
  const position = useClientStore((s) => s.positions[asset]);
  const marketOrderSlippage = useUserSettings((s) => s.marketOrderSlippage);
  const client = useClient();
  const [maxClosingAmounts, setMaxClosingAmounts] = useState<{
    maxCloseSize: number;
    maxCloseValue: number;
  }>();

  const calcClosingValues = useCallback(() => {
    if (!client?.account || !position) return;
    const closingLimits = calculateMaxCloseSize(
      client.account,
      position,
      closingSide,
      closeSize,
      price,
      marketOrderSlippage
    );

    setMaxClosingAmounts(closingLimits);
  }, [client?.account, closeSize, closingSide, position, price, marketOrderSlippage]);

  useInterval(calcClosingValues, interval, true);

  return maxClosingAmounts;
};

/**
 *
 * @param xma cross margin account
 * @param position position to close
 * @param closingSide side the closing order will be placed on (opposite of the original position)
 * @param closeSize size of the closing order. This is UNSIGNED.
 * @param price price of the closing order
 * @returns max closable size and dollar value
 */
export const calculateMaxCloseSize = (
  xma: CrossMarginAccount,
  position: Position,
  closingSide: Side,
  closeSize: number,
  price: number,
  slippage: number,
) => {
  const assetLiquidity = checkLiquidity(closeSize, position.asset, closingSide, slippage);

  const isTaker =
    closingSide === Side.BID
      ? price >= assetLiquidity.avgPrice
      : price <= assetLiquidity.avgPrice;

  const maxTradeSize = Exchange.riskCalculator.getMaxTradeSize(
    xma,
    position.asset,
    closingSide,
    price,
    isTaker
  );

  const maxTradeValue = Big(maxTradeSize).mul(price).toNumber();
  const positionSize = Math.abs(position.size);
  const closingValueCeiling = Big(positionSize).mul(price).toNumber();
  const closingSizeCeiling = positionSize;

  return {
    maxCloseSize: Math.min(closingSizeCeiling, maxTradeSize),
    maxCloseValue: Math.min(closingValueCeiling, maxTradeValue),
  };
};
