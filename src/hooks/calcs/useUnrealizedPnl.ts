import { useInterval } from "@hooks/utility/useInterval";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useState } from "react";
import { useCalculationStore } from "stores";

export const useUnrealizedPnL = (interval: number | null) => {
  const [uPnl, setUPnl] =
    useState<Map<Asset, { nominal: number; percentage: number }>>();

  useInterval(
    () => {
      const assetUnrealizedPnl = new Map<
        Asset,
        { nominal: number; percentage: number }
      >();

      useCalculationStore.getState().assetMetrics?.forEach((metrics, asset) => {
        assetUnrealizedPnl.set(asset, {
          nominal: metrics.unrealizedPnl,
          percentage: (metrics.unrealizedPnl / metrics.initialMargin) * 100,
        });
      });

      setUPnl(assetUnrealizedPnl);
    },
    interval,
    true
  );

  return uPnl;
};
