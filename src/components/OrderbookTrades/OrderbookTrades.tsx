import { useState } from "react";
import { Orderbook } from "@components/Orderbook";
import { RecentTrades } from "@components/RecentTrades";
import {
  OrderbookTradesWrapper,
  StyledTabs,
  StyledTab,
  StyledText,
} from "./styles";
import { useScreenSize } from "@hooks/utility/useScreenSize";
import { Analytics, AnalyticsEvent } from "analytics";
import { useTheme } from "styled-components";

export const OrderbookTrades = ({ className }: { className?: string }) => {
  const { width } = useScreenSize();
  const [orderbookTabIndex, setOrderbookTabIndex] = useState(0);
  const theme = useTheme();

  // See Trade component for media queries
  if (theme && width >= parseInt(theme.breakpoints.lg)) {
    return (
      <OrderbookTradesWrapper className={className}>
        <StyledText variant="h3">Orderbook</StyledText>
        <Orderbook />
        <StyledText variant="h3">Recent Trades</StyledText>
        <RecentTrades />
      </OrderbookTradesWrapper>
    );
  }

  return (
    <OrderbookTradesWrapper className={className}>
      <StyledTabs
        selectedIndex={orderbookTabIndex}
        variant="underlined"
        onChange={(index) => {
          setOrderbookTabIndex(index);
        }}
      >
        <StyledTab>Orderbook</StyledTab>
        <StyledTab>Recent Trades</StyledTab>
      </StyledTabs>
      {orderbookTabIndex === 0 ? (
        <Analytics eventType={AnalyticsEvent.ViewOrderbook}>
          <Orderbook />
        </Analytics>
      ) : (
        <Analytics eventType={AnalyticsEvent.ViewRecentTrades}>
          <RecentTrades />
        </Analytics>
      )}
    </OrderbookTradesWrapper>
  );
};
