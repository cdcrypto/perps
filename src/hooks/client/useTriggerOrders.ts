import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useClientStore } from "stores";

export const useTriggerOrders = () => {
  const triggerOrders = useClientStore((s) => s.triggerOrders);

  return triggerOrders;
};

export const useAssetTriggerOrders = (asset: Asset) => {
  const triggerOrders = useTriggerOrders();

  return triggerOrders[asset];
};
