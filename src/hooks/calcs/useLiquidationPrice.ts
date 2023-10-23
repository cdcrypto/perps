import { useCallback } from "react";
import { useCalculations } from "./useCalculations.js";
import { Asset } from "@zetamarkets/sdk/dist/constants";

export const useLiquidationPrice = () => {
  const { getLiquidationPrice: calculateLiquidationPrice } = useCalculations();

  const getLiquidationPrice = useCallback(
    (asset: Asset, signedPosition: number) => {
      return calculateLiquidationPrice(asset, signedPosition);
    },
    [calculateLiquidationPrice]
  );

  return getLiquidationPrice;
};
