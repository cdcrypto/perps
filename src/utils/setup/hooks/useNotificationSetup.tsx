import { notifications } from "@components/Notification";
import { MAX_LOT_SIZE_PRECISION } from "@utils/constants";
import {
  convertDollarNumberToString, convertNumberToString
} from "@utils/general";
import { CrossClient, assets } from "@zetamarkets/sdk";
import { POSITION_PRECISION } from "@zetamarkets/sdk/dist/constants";
import { TradeEventV3 } from "@zetamarkets/sdk/dist/program-types";
import { Order, Side } from "@zetamarkets/sdk/dist/types";
import Big from "big.js";
import { useWalletNotificationsSetup } from "./useWalletNotificationsSetup";


enum TradeEventType {
  PartiallyFilled,
  Completed,
  PartiallyClosed,
  Closed,
}
const POSITION_DIVIDER = Big(10).pow(POSITION_PRECISION);

const getFormattedContractDesc = (trade: TradeEventV3, matchingOrder?: Order) => {
  const orderSize = Big(trade.size.toString()).div(POSITION_DIVIDER).toNumber();


  const orderSizeStr = convertNumberToString(orderSize, 0, MAX_LOT_SIZE_PRECISION);
  const sideStr = trade.isBid ? "buy" : "sell";

  const orderPrice = Big(trade.costOfTrades.toString()).div(Big(trade.size.toString())).div(POSITION_DIVIDER).toNumber();
  // const orderPrice = Big(orderPriceRaw).div(Big(10).pow(POSITION_PRECISION)).toNumber()

  const priceStr = `${convertDollarNumberToString(orderPrice)}`;
  const orderRemainingSize = matchingOrder ? (matchingOrder.size - orderSize) : 0;
  const orderRemainingSizeStr = convertNumberToString(orderRemainingSize, 0, MAX_LOT_SIZE_PRECISION);

  return {
    orderSizeStr,
    sideStr,
    priceStr,
    orderRemainingSizeStr,
  };

};

export const useNotificationSetup = () => {

  useWalletNotificationsSetup();

  const handleTradeEvents = (events: TradeEventV3[], positions: CrossClient["positions"], orders: CrossClient["orders"]) => {
    // partially completed - if the order still exists

    events.forEach((data) => {

      let tradeType: TradeEventType;
      const eventSide = data.isBid ? Side.BID : Side.ASK;
      const asset = assets.fromProgramAsset(data.asset);
      const matchingOrder = orders.get(asset)?.find((o) => o.orderId.eq(data.orderId));

      const matchingPosition = positions.get(asset)?.[0];
      const matchingPositionSide = (matchingPosition?.size ?? 0) > 0 ? Side.BID : Side.ASK;

      if (!matchingPosition) {
        // Only way to end up without a position on a trade even is if a position is closed.
        tradeType = TradeEventType.Closed;
      } else if (eventSide !== matchingPositionSide) {
        tradeType = TradeEventType.PartiallyClosed;
      } else if (matchingOrder) {
        tradeType = TradeEventType.PartiallyFilled;
      } else {
        // No matching order, it has to be completely filled
        tradeType = TradeEventType.Completed;
      }

      switch (tradeType) {
        case TradeEventType.PartiallyFilled: {
          // It is ensured that we have a matching order
          const { sideStr, orderRemainingSizeStr, priceStr } = getFormattedContractDesc(data, matchingOrder);

          notifications.notify({
            variant: "success",
            header: "Order Partially Filled",
            body: `${sideStr} ${orderRemainingSizeStr} ${asset}-PERP at ${priceStr} remaining.`,
          });
          break;
        }
        case TradeEventType.Completed: {
          const { sideStr, orderSizeStr, priceStr } = getFormattedContractDesc(data);

          notifications.notify({
            variant: "success",
            header: "Order Filled",
            body: `Your ${sideStr} ${orderSizeStr} ${asset}-PERP  at ${priceStr} order has been fully filled.`,
          });
          break;
        }
        case TradeEventType.PartiallyClosed: {
          if (matchingPosition) {
            const positionStr = matchingPosition.size > 0 ? "Long" : "Short";
            const positionRemainingSize = matchingPosition.size;
            const positionRemainingSizeStr = convertNumberToString(positionRemainingSize, 0, MAX_LOT_SIZE_PRECISION);

            notifications.notify({
              variant: "success",
              header: "Position Partially Closed",
              body: `${positionStr} ${positionRemainingSizeStr} ${asset}-PERP remaining`,
            });
          }

          break;
        }
        case TradeEventType.Closed: {
          notifications.notify({
            variant: "success",
            header: "Position Closed",
            body: `You have successfully closed your ${asset} position.`,
          });
          break;
        }
      }
    });
  };

  return handleTradeEvents;
};
