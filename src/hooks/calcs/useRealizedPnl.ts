import { useClient } from "@hooks/client/useClient";
import { useInterval } from "@hooks/utility/useInterval";
import { CrossClient, Exchange } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { ProgramAccountType } from "@zetamarkets/sdk/dist/types";
import { convertDecimalToNativeLotSize } from "@zetamarkets/sdk/dist/utils";
import { useState } from "react";
import { useAssetMetrics } from "@hooks/calcs/useAssetMetrics";

/**
 *
 * @param asset asset to realize pnl for
 * @param price price of asset to realize pnl for
 * @param size how much of the asset
 * @param addTakerFees whether to subtract taker fees to the realized pnl
 * @param interval
 * @returns
 */
export const useRealizedPnl = (
  asset: Asset,
  price: number,
  size: number,
  addTakerFees: boolean,
  interval: number
) => {
  const client = useClient();
  const assetMetrics = useAssetMetrics(500);

  const [pnl, setPnl] = useState<{ nominal: number; percentage: number }>();

  useInterval(
    () => {
      const initialMargin = assetMetrics?.get(asset)?.initialMargin;

      if (!client?.account || !initialMargin) return;

      const pnl = calculateEstimatedRealizedPnl(
        client,
        addTakerFees,
        asset,
        price,
        size
      );

      setPnl({ nominal: pnl, percentage: (pnl / initialMargin) * 100 });
    },
    interval,
    true
  );

  return pnl;
};

const calculateEstimatedRealizedPnl = (
  client: CrossClient,
  addTakerFees: boolean,
  asset: Asset,
  price: number,
  size: number
) => {
  if (!client?.account) {
    return 0;
  }

  const pnl = Exchange.riskCalculator.estimateRealizedPnl(
    client.account,
    ProgramAccountType.CrossMarginAccount,
    {
      isTaker: addTakerFees,
      asset,
      price,
      size: convertDecimalToNativeLotSize(size),
    }
  );

  return pnl;
};
