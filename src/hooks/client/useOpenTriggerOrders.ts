import { OpenTriggerOrder } from "@web/components/TriggerOrdersTable/TriggerOrdersColumns";
import { useFlatTriggerOrders } from "./useFlatTriggerOrders";
import { useClientStore } from "stores";
import { useMemo } from "react";
import { Side } from "@zetamarkets/sdk/dist/types";
import {
  convertNativeIntegerToDecimal,
  convertNativeLotSizeToDecimal,
} from "@zetamarkets/sdk/dist/utils";
import { getTriggerOrderType } from "@utils/general";

/**
 * Hook to return trigger orders that should be visible within the FE and filters out orders
 * that should not be visible.
 */
export const useOpenTriggerOrders = (isInitialized = true) => {
  const triggerOrders = useFlatTriggerOrders();
  const positions = useClientStore((s) => s.positions);

  const openTriggerOrders = useMemo(() => {
    if (!isInitialized) {
      return [];
    }

    return triggerOrders
      .map((triggerOrder) => {
        const positionSize = positions[triggerOrder.asset]?.size || 0;
        const positionSide = positionSize > 0 ? Side.BID : Side.ASK;

        const triggerPrice = convertNativeIntegerToDecimal(
          triggerOrder.triggerPrice ?? 0
        );
        const executionPrice = convertNativeIntegerToDecimal(
          triggerOrder.orderPrice
        );
        const triggerSize = convertNativeLotSizeToDecimal(triggerOrder.size);
        const quantityRemaining = Math.min(triggerSize, Math.abs(positionSize));

        if (quantityRemaining === 0 || !triggerOrder.triggerDirection) {
          return undefined;
        }

        // just do trigger price for now since there's no limit orders possible
        // any difference is due to slippage.
        const notionalValue = quantityRemaining * triggerPrice;

        const triggerOrderType = getTriggerOrderType(
          positionSide,
          triggerOrder.triggerDirection
        );

        return {
          triggerOrder,
          triggerOrderType,
          asset: triggerOrder.asset,
          side: positionSide,
          triggerPrice,
          executionPrice,
          quantityRemaining,
          notionalValue,
        };
      })
      .filter(removeUndefinedTriggerOrders);
  }, [positions, triggerOrders, isInitialized]);

  return openTriggerOrders;
};

export const removeUndefinedTriggerOrders = (
  triggerOrder: OpenTriggerOrder | undefined
): triggerOrder is OpenTriggerOrder => {
  return triggerOrder !== undefined;
};
