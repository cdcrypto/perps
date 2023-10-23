import { useEffect, useMemo } from "react";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { useZetaStore } from "stores";
import { shallow } from "zustand/shallow";
import { formatAssetPrice } from "@utils/general";

export const useWindowTitleSetup = () => {
  const { prices } = useZetaStore(
    (state) => ({
      prices: state.prices,
    }),
    shallow
  );
  const { selectedAsset } = useMarketDetails();

  const selectedAssetPrice = useMemo(() => {
    return prices[selectedAsset];
  }, [selectedAsset, prices]);

  useEffect(() => {
    if (!selectedAssetPrice) return;
    document.title = `${formatAssetPrice(
      selectedAsset,
      selectedAssetPrice
    )} ${selectedAsset}-PERP | Zeta Markets`;
  }, [selectedAsset, selectedAssetPrice]);
};
