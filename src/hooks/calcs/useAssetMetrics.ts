import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useState } from "react";
import { useCalculationStore } from "stores";
import { useInterval } from "@hooks/utility/useInterval";
import { AssetRiskState } from "@zetamarkets/sdk/dist/types";

export const useAssetMetrics = (interval: number) => {
  const [assetMetrics, setAssetMetrics] = useState<
    Map<Asset, AssetRiskState> | undefined
  >(useCalculationStore.getState().assetMetrics);

  useInterval(
    () => {
      const updatedAssetMetrics = useCalculationStore.getState().assetMetrics;
      setAssetMetrics(updatedAssetMetrics);
    },
    interval,
    true
  );

  return assetMetrics;
};
