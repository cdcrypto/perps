import { useClient } from "@hooks/client/useClient";
import { checkLiquidity } from "@hooks/useLiquidityCheck";
import { useInterval } from "@hooks/utility/useInterval";
import { MIN_LOT_SIZE } from "@utils/constants";
import { Exchange } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useCallback, useState } from "react";
import { useClientStore, useUserSettings } from "stores";

export type MaxTradeSizeParams = {
  asset: Asset;
  side: Side;
  price: number;
  reduceOnly: boolean;
};

export type MaxTradeSizeData = {
  maxTradeSize: number;
  maxTradeValue: number;
};

export const useMaxTradeSize = (
  { asset, side, price, reduceOnly }: MaxTradeSizeParams,
  interval: number | null
) => {
  const [maxTradeSize, setMaxTradeSize] = useState<MaxTradeSizeData>();

  const client = useClient();
  const marketOrderSlippage = useUserSettings((s) => s.marketOrderSlippage);

  const calcMaxTradeSize = useCallback(() => {
    if (!client || !client.account) return;

    const absPositionSize = Math.abs(
      useClientStore.getState().positions[asset]?.size ?? 0
    );

    const assetLiquidity = checkLiquidity(
      MIN_LOT_SIZE,
      asset,
      side,
      marketOrderSlippage
    );

    const isTaker =
      side === Side.BID
        ? price >= assetLiquidity.avgPrice
        : price <= assetLiquidity.avgPrice;

    let maxTradeSize = Exchange.riskCalculator.getMaxTradeSize(
      client.account,
      asset,
      side,
      price,
      isTaker
    );

    if (reduceOnly) {
      maxTradeSize = Math.min(maxTradeSize, absPositionSize);
    }

    const maxTradeValue = maxTradeSize * price;
    setMaxTradeSize({ maxTradeSize, maxTradeValue });
  }, [asset, client, price, side, marketOrderSlippage, reduceOnly]);

  useInterval(calcMaxTradeSize, interval, true);

  return maxTradeSize;
};
