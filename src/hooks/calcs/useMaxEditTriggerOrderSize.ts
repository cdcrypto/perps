import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useMaxTriggerOrderSize } from "./useMaxTriggerOrderSize";

export const useMaxEditTriggerOrderSize = (
  asset: Asset,
  triggerPrice: number,
  quantityRemaining: number
) => {
  const baseMaxSize = useMaxTriggerOrderSize(asset, triggerPrice);

  const maxEditableSize = quantityRemaining + baseMaxSize;

  return maxEditableSize;
};
