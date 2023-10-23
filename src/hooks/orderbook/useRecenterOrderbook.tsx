import { useEffect, useRef } from "react";
import { ORDERBOOK_ROW_HEIGHT } from "../../components/Orderbook/orderbookRowHeight";

interface UseRecenterOrderbookParams {
  bidAskContainerHeight: number;
  onCenterOrderbook: (scrollBehavior?: ScrollBehavior) => void;
  asksCount: number;
}

export const useRecenterOrderbook = ({
  bidAskContainerHeight,
  onCenterOrderbook,
  asksCount,
}: UseRecenterOrderbookParams) => {
  // recenter orderbook when asks height was less than half of the bidAskContainerHeight
  // and now is more than half of the bidAskContainerHeight
  const wasAskHeightLessThanHalf = useRef(true);
  useEffect(() => {
    if (bidAskContainerHeight === 0) {
      return;
    }

    const asksHeight = asksCount * ORDERBOOK_ROW_HEIGHT;
    const isAskHeightLessThanHalf =
      asksHeight < Math.ceil(bidAskContainerHeight / 2);

    if (!isAskHeightLessThanHalf && wasAskHeightLessThanHalf.current) {
      onCenterOrderbook("auto");
    }

    wasAskHeightLessThanHalf.current = isAskHeightLessThanHalf;
  }, [asksCount, bidAskContainerHeight, onCenterOrderbook]);

  // recenter orderbook when user switches back to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        onCenterOrderbook("auto");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onCenterOrderbook]);
};
