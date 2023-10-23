import { Exchange } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { analytics } from "analytics";
import { useCallback, useRef } from "react";
import { useSelectedContractStore } from "stores";
import { shallow } from "zustand/shallow";

export const useSwitchAsset = () => {
  const { setMarket, setAsset } = useSelectedContractStore(
    (s) => ({
      setMarket: s.setMarket,
      setAsset: s.setAsset,
    }),
    shallow
  );
  const previousAsset = useSelectedContractStore((s) => s.asset);

  const previousAssetRef = useRef(previousAsset);

  const switchAsset = useCallback(
    (asset: Asset) => {
      if (previousAssetRef.current !== asset) {
        setAsset(asset);
        setMarket(Exchange.getPerpMarket(asset));
        analytics.selectMarket(asset);
        // Subscribe to orderbook for new asset
        // Exchange.getPerpMarket(asset).subscribeOrderbook();

        // Unsub to orderbook for old asset
        // This is async but it doesn't necessarily have to complete for the asset switch to show on FE
        // We prefer a quick switch + unsub takes longer, rather than waiting for unsubbing to complete

        // Exchange.getPerpMarket(previousAssetRef.current).unsubscribeOrderbook(true);
        previousAssetRef.current = asset;
      }
    },
    [setMarket, setAsset, previousAssetRef]
  );

  return switchAsset;
};
