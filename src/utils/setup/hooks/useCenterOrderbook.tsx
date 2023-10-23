import { useElementBounds } from "@hooks/utility/useElementBounds";
import { useState, useCallback, useEffect, useRef } from "react";

export const useCenterOrderbook = () => {
  const [setBidAskContainerRef, bidAskContainerBounds] =
    useElementBounds<HTMLDivElement>();

  const [spreadInfoContainerRef, setSpreadInfoContainerRef] =
    useState<HTMLDivElement | null>(null);

  const onCenterOrderbook = useCallback(
    (scrollBehavior: ScrollBehavior = "smooth") => {
      if (!spreadInfoContainerRef || !spreadInfoContainerRef.parentElement) {
        return;
      }

      const top = Math.max(
        spreadInfoContainerRef.offsetTop -
          bidAskContainerBounds.height / 2 +
          spreadInfoContainerRef.clientHeight / 2,
        1 // prevent scrolling to the absolute top of the page as scroll will be anchored to the top of the container when it is at the top of the page
        // when scroll is anchored to the top, orderbook will not be able to automatically recenter when new orders come in
      );

      spreadInfoContainerRef.parentElement.scrollTo({
        top,
        behavior: scrollBehavior,
      });
    },
    [bidAskContainerBounds.height, spreadInfoContainerRef]
  );

  // center orderbook when orderbook changes from being unscrollable to scrollable
  const [isOrderbookScrollable, setIsOrderbookScrollable] = useState(false);
  const wasOrderbookScrollable = useRef(false);
  useEffect(() => {
    const handleResize = () => {
      if (!spreadInfoContainerRef?.parentElement) {
        return;
      }

      const isOrderbookScrollableNow =
        spreadInfoContainerRef.parentElement.clientHeight <
        spreadInfoContainerRef.parentElement.scrollHeight;

      if (isOrderbookScrollableNow && !wasOrderbookScrollable.current) {
        onCenterOrderbook("auto");
      }

      setIsOrderbookScrollable(isOrderbookScrollableNow);
      wasOrderbookScrollable.current = isOrderbookScrollable;
    };

    if (spreadInfoContainerRef?.parentElement) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(spreadInfoContainerRef.parentElement);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOrderbookScrollable, onCenterOrderbook, spreadInfoContainerRef]);

  return {
    setBidAskContainerRef,
    setSpreadInfoContainerRef,
    onCenterOrderbook,
    bidAskContainerHeight: bidAskContainerBounds.height,
  };
};
