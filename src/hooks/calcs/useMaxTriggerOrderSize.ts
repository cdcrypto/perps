import { useInterval } from "@hooks/utility/useInterval";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import {
  convertNativeIntegerToDecimal,
  convertNativeLotSizeToDecimal,
} from "@zetamarkets/sdk/dist/utils";
import { useCallback, useState } from "react";
import { useClientStore, useZetaStore } from "stores";

/**
 *
 * @param asset             The asset to perform the calculations for
 * @param triggerPrice      The theoretical trigger price of the order
 * @returns                 The maximum size a user can open for the given asset and trigger price.
 */
export const useMaxTriggerOrderSize = (asset: Asset, triggerPrice: number) => {
  const [maxSize, setMaxSize] = useState(0);

  const calculateMaxSize = useCallback(() => {
    const triggerOrders = useClientStore.getState().triggerOrders[asset] ?? [];
    const marketPrice = useZetaStore.getState().prices[asset];
    const positionSize = useClientStore.getState().positions[asset]?.size || 0;
    const absPositionSize = Math.abs(positionSize);

    const { sizeLessThanMarket, sizeGreaterThanMarket } = triggerOrders.reduce(
      (acc, triggerOrder) => {
        const triggerPrice = convertNativeIntegerToDecimal(
          triggerOrder.triggerPrice ?? 0
        );

        const triggerSize = convertNativeLotSizeToDecimal(
          Math.abs(triggerOrder.size)
        );

        if (triggerPrice > marketPrice) {
          acc.sizeGreaterThanMarket += triggerSize;
        } else {
          acc.sizeLessThanMarket += triggerSize;
        }

        return acc;
      },
      {
        sizeLessThanMarket: 0,
        sizeGreaterThanMarket: 0,
      }
    );

    if (triggerPrice >= marketPrice) {
      setMaxSize(Math.max(0, absPositionSize - sizeGreaterThanMarket));
    } else {
      setMaxSize(Math.max(0, absPositionSize - sizeLessThanMarket));
    }
  }, [asset, triggerPrice]);

  useInterval(calculateMaxSize, 1000, true);
  return maxSize;
};
