import { Decimal, Exchange } from "@zetamarkets/sdk";
import { assetToIndex } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useZetaStore } from "stores";

export const useDailyFundingRate = (asset: Asset) => {
  const { isInitialized } = useZetaStore((s) => ({
    isInitialized: s.isInitialized,
  }));

  if (!isInitialized) {
    return 0;
  }

  const dailyFundingRate = Decimal.fromAnchorDecimal(
    Exchange.pricing.latestFundingRates[assetToIndex(asset)]
  ).toNumber();

  return dailyFundingRate;
};
