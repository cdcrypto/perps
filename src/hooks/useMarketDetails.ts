import { useSelectedContractStore } from "stores";

export const useMarketDetails = () => {
  const market = useSelectedContractStore((s) => s.market);
  const asset = useSelectedContractStore((s) => s.asset);

  return {
    market,
    selectedAsset: market?.asset || asset,
  };
};
