import { Exchange, assets, constants } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";

export const calculateMaxLeverage = (asset: Asset) => {
  return 100 /
    (Exchange.pricing.marginParameters[
      assets.assetToIndex(asset)
    ].futureMarginInitial.toNumber() /
      10 ** constants.PLATFORM_PRECISION);
};
