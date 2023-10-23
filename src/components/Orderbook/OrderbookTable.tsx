import {
  BidAskTransitionGroup,
  BidAskContainer,
  HeaderContainer,
  OrderBookTableSection,
  OrderbookTableContainer,
  SpreadInfoContainer,
} from "./styles";
import { OrderbookRow } from "./OrderbookRow";
import { useEffect, useMemo } from "react";
import { Text } from "@components/Text";
import { CSSTransition } from "react-transition-group";
import { Level, Side } from "@zetamarkets/sdk/dist/types";
import { useOrderbook, useWebserverOrderbook } from "@hooks/api/useOrderbook";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { ORDERBOOK_PRECISION } from "./Orderbook";
import { useFlatOrders } from "@hooks/client/useFlatOrders";
import { useOrderbookValues } from "../../hooks/orderbook/useOrderbookValues";
import { groupLevels } from "./groupLevels";
import { calculateVolume } from "./calculateVolume";
import { useRecenterOrderbook } from "../../hooks/orderbook/useRecenterOrderbook";

interface OrderbookTableProps {
  priceIncrement: number;
  /**
   * Classname that will be passed in to the root
   */
  className?: string;

  setBidAskContainerRef: (node: HTMLDivElement | null) => void;
  bidAskContainerHeight: number;
  setSpreadInfoContainerRef: (node: HTMLDivElement | null) => void;
  onCenterOrderbook: (scrollBehavior?: ScrollBehavior) => void;
}

const NO_DATA: Level[] = [];

/**
 * TODO: Handle empty state of orderbook + adding in the data
 */
export const OrderbookTable = ({
  className,
  priceIncrement,
  setBidAskContainerRef,
  bidAskContainerHeight,
  setSpreadInfoContainerRef,
  onCenterOrderbook,
}: OrderbookTableProps) => {
  const { selectedAsset } = useMarketDetails();
  const orderbookData = useOrderbook(selectedAsset);
  const orderbookWebserverData = useWebserverOrderbook();

  const clientOrders = useFlatOrders();
  const clientOrderPrices = useMemo(() => {
    const groupedClientOrdersAsk = groupLevels(
      clientOrders.filter((order) => order.side === Side.ASK),
      Side.ASK,
      priceIncrement
    );
    const groupedClientOrdersBid = groupLevels(
      clientOrders.filter((order) => order.side === Side.BID),
      Side.BID,
      priceIncrement
    );
    return {
      asks: new Set(
        groupedClientOrdersAsk.map((clientOrder) => clientOrder.price)
      ),
      bids: new Set(
        groupedClientOrdersBid.map((clientOrder) => clientOrder.price)
      ),
    };
  }, [clientOrders, priceIncrement]);

  const selectedOrderbook =
    orderbookData ?? orderbookWebserverData?.[selectedAsset];

  const bids = selectedOrderbook?.bids ?? NO_DATA;
  const asks = selectedOrderbook?.asks ?? NO_DATA;

  const totalVolume = useMemo(
    () => calculateVolume(bids).add(calculateVolume(asks)),
    [asks, bids]
  );

  const bidValues = useOrderbookValues({
    levels: bids,
    priceIncrement,
    side: Side.BID,
    totalVolume,
  });

  const askValues = useOrderbookValues({
    levels: asks,
    priceIncrement,
    side: Side.ASK,
    totalVolume,
  });

  const spread = useMemo(() => {
    if (!asks.length || !bids.length) return undefined;
    return asks[0].price - bids[0].price;
  }, [asks, bids]);

  const spreadDifferenceStr = useMemo(() => {
    if (!spread) return "-";
    if (spread < 0.01) return "<$0.01";
    return `$${spread.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: ORDERBOOK_PRECISION,
    })}`;
  }, [spread]);

  const spreadPercentStr = useMemo(() => {
    if (!spread) return "-%";
    const spreadDifferencePercent = (spread / asks[0].price) * 100;

    if (spreadDifferencePercent < 0.01) return "<0.01%";

    return (
      spreadDifferencePercent.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: ORDERBOOK_PRECISION,
      }) + "%"
    );
  }, [asks, spread]);
  const ordersIncrement = askValues?.[0]?.priceIncrement;
  const ordersAsset = askValues?.[0]?.asset;

  useEffect(() => {
    if (ordersIncrement && ordersAsset) {
      onCenterOrderbook("auto");
    }
  }, [onCenterOrderbook, ordersAsset, ordersIncrement]);

  useRecenterOrderbook({
    asksCount: askValues.length,
    bidAskContainerHeight,
    onCenterOrderbook,
  });

  return (
    <OrderbookTableContainer className={className}>
      <OrderBookTableSection>
        <HeaderContainer>
          <Text variant="label" color="secondary">
            Price ($)
          </Text>
          <Text variant="label" color="secondary" rightAlign>
            Size ({selectedAsset})
          </Text>
          <Text variant="label" color="secondary" rightAlign>
            Size (USD)
          </Text>
        </HeaderContainer>
        <BidAskContainer ref={setBidAskContainerRef}>
          {!asks || !bids ? (
            <Text variant="caption">Loading...</Text>
          ) : asks?.length === 0 || bids?.length === 0 ? (
            <Text variant="caption">-</Text>
          ) : (
            <BidAskTransitionGroup id="bid-ask_container" exit={false}>
              {askValues.map((ask, index, arr) => {
                return (
                  <CSSTransition
                    // keys are generated from large to small so new elements are added to the top of the div
                    // this is so that the scroll position doesn't change when new elements are added
                    // how does this work: when the keys are generated from large to small, a never seen before key
                    // will always be found at the top of the mapped array, and thus the new element will be added to the top
                    key={arr.length - index}
                    timeout={500}
                    classNames="card"
                  >
                    <OrderbookRow
                      {...ask}
                      isClientOrder={clientOrderPrices.asks.has(ask.price)}
                      priceIncrement={priceIncrement}
                      side={Side.ASK}
                    />
                  </CSSTransition>
                );
              })}

              <SpreadInfoContainer ref={setSpreadInfoContainerRef}>
                <Text variant="caption" color="textActive">
                  Spread
                </Text>
                <Text variant="caption" color="textActive" rightAlign>
                  {spreadDifferenceStr}
                </Text>
                <Text variant="caption" color="textActive" rightAlign>
                  {spreadPercentStr}
                </Text>
              </SpreadInfoContainer>
              {bidValues.map((bid, index) => {
                return (
                  <CSSTransition
                    // keys are generated from small to large so new elements are added to the bottom of the div
                    // this is so that the scroll position doesn't change when new elements are added
                    // how does this work: when the keys are generated from small to large, a never seen before key
                    // will always be found at the bottom of the mapped array, and thus the new element will be added to the bottom
                    key={index}
                    timeout={500}
                    classNames="card"
                  >
                    <OrderbookRow
                      {...bid}
                      isClientOrder={clientOrderPrices.bids.has(bid.price)}
                      priceIncrement={priceIncrement}
                      side={Side.BID}
                    />
                  </CSSTransition>
                );
              })}
            </BidAskTransitionGroup>
          )}
        </BidAskContainer>
      </OrderBookTableSection>
    </OrderbookTableContainer>
  );
};
