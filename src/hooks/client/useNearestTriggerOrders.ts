import { useInterval } from "@hooks/utility/useInterval";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side, TriggerOrder } from "@zetamarkets/sdk/dist/types";
import {
  convertDecimalToNativeInteger,
  convertNativeLotSizeToDecimal,
} from "@zetamarkets/sdk/dist/utils";
import { useCallback, useState } from "react";
import { useClientStore, useZetaStore } from "stores";

interface NearestTriggerOrders {
  nearestStopLoss: TriggerOrder | undefined;
  nearestTakeProfit: TriggerOrder | undefined;
  canOpenTriggers: boolean;
}

export const useNearestTriggerOrders = (asset: Asset) => {
  const [nearestTriggerOrders, setNearestTriggerOrders] =
    useState<NearestTriggerOrders>({
      nearestStopLoss: undefined,
      nearestTakeProfit: undefined,
      canOpenTriggers: true,
    });

  const getNearestTriggerOrders = useCallback(() => {
    const marketPrice = convertDecimalToNativeInteger(
      useZetaStore.getState().prices[asset]
    );
    const { triggerOrders: triggerOrdersMap, positions } =
      useClientStore.getState();
    const triggerOrders = triggerOrdersMap[asset];
    const positionSize = positions[asset]?.size || 0;
    const side = positionSize > 0 ? Side.BID : Side.ASK;

    // I think this is more readable than a single reduce, feel free to disagree
    const aboveMarketPriceTriggers = triggerOrders.filter(
      (triggerOrder) => (triggerOrder.triggerPrice || 0) >= marketPrice
    );
    const aboveMarketPriceSize = aboveMarketPriceTriggers.reduce(
      (acc, triggerOrder) =>
        acc + Math.abs(convertNativeLotSizeToDecimal(triggerOrder.size)),
      0
    );

    const belowMarketPriceTriggers = triggerOrders.filter(
      (triggerOrder) => (triggerOrder.triggerPrice || 0) < marketPrice
    );
    const belowMarketPriceSize = belowMarketPriceTriggers.reduce(
      (acc, triggerOrder) =>
        acc + Math.abs(convertNativeLotSizeToDecimal(triggerOrder.size)),
      0
    );

    const nearestGreaterTrigger = aboveMarketPriceTriggers.reduce(
      (closestTrigger: TriggerOrder | undefined, currentTrigger) => {
        const closestTriggerPrice =
          closestTrigger?.triggerPrice ?? Number.MAX_SAFE_INTEGER;
        const currentTriggerPrice =
          currentTrigger.triggerPrice ?? Number.MAX_SAFE_INTEGER;

        return closestTriggerPrice <= currentTriggerPrice
          ? closestTrigger
          : currentTrigger;
      },
      undefined
    );

    const nearestSmallerTrigger = belowMarketPriceTriggers.reduce(
      (closestTrigger: TriggerOrder | undefined, currentTrigger) => {
        const closestTriggerPrice =
          closestTrigger?.triggerPrice ?? Number.MIN_SAFE_INTEGER;
        const currentTriggerPrice =
          currentTrigger.triggerPrice ?? Number.MIN_SAFE_INTEGER;

        return closestTriggerPrice >= currentTriggerPrice
          ? closestTrigger
          : currentTrigger;
      },
      undefined
    );

    const _canOpenTriggers =
      aboveMarketPriceSize < Math.abs(positionSize) ||
      belowMarketPriceSize < Math.abs(positionSize);

    if (side === Side.BID) {
      setNearestTriggerOrders({
        nearestStopLoss: nearestSmallerTrigger,
        nearestTakeProfit: nearestGreaterTrigger,
        canOpenTriggers: _canOpenTriggers,
      });
    } else {
      setNearestTriggerOrders({
        nearestStopLoss: nearestGreaterTrigger,
        nearestTakeProfit: nearestSmallerTrigger,
        canOpenTriggers: _canOpenTriggers,
      });
    }
  }, [asset]);

  useInterval(getNearestTriggerOrders, 1000, true);
  return nearestTriggerOrders;
};
