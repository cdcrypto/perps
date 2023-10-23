import { Asset } from "@zetamarkets/sdk/dist/constants";
import { TriggerOrder } from "@zetamarkets/sdk/dist/types";
import { useClientStore } from "stores";

export const useFlatTriggerOrders = () => {
  const triggerOrders = useClientStore((s) => s.triggerOrders);
  const flattenedTriggerOrders = flattenTriggerOrders(triggerOrders);

  return flattenedTriggerOrders;
};

const flattenTriggerOrders = (obj: Record<Asset, TriggerOrder[]>) =>
  Object.values(obj).flat();
