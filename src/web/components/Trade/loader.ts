import { LoaderFunction } from "react-router-dom";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { nameToAsset } from "@zetamarkets/sdk/dist/assets";
import { useSelectedContractStore } from "stores";

export const tradeLoader: LoaderFunction = ({ params }) => {
  let asset: Asset = Asset.UNDEFINED;
  try {

    if (params.asset) {
      const maybeAsset = params.asset.split("-")[0].toUpperCase();
      asset = nameToAsset(maybeAsset);
    }
  } catch (err) {
    console.warn("Unable to parse asset from url", err);
  }

  if (asset !== Asset.UNDEFINED) {
    useSelectedContractStore.getState().setAsset(asset);
  }
  return asset;

};
