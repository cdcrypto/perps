import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Order } from "@zetamarkets/sdk/dist/types";
import { useClientStore } from "stores";

export const useFlatOrders = () => {
  const orders = useClientStore((s) => s.orders);

  return flattenOrders(orders);
};

export const getFlatOrders = () => {
  const orders = useClientStore.getState().orders;

  return flattenOrders(orders);
};

export const flattenOrders = (obj: Record<Asset, Order[]>) =>
  Object.values(obj).reduce((acc, val) => acc.concat(val), []);
