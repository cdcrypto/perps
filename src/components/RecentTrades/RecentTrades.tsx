import { useRecentTrades } from "@hooks/api/useRecentTrades";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { useMemo } from "react";
import { RecentTradeRow } from "./RecentTradeRow";
import {
  RecentTradesTableContainer,
  RecentTradesContainer,
  TradesTransitionGroup,
} from "./styles";
import { HeaderContainer } from "@components/Orderbook/styles";
import { Text } from "@components/Text";
import { CSSTransition } from "react-transition-group";

export const RecentTrades = ({ className }: { className?: string }) => {
  const recentTrades = useRecentTrades();
  const { selectedAsset } = useMarketDetails();

  const flatRecentTrades = useMemo(
    () => recentTrades?.[selectedAsset],
    [recentTrades, selectedAsset]
  );

  return (
    <RecentTradesTableContainer className={className}>
      <HeaderContainer>
        <Text variant="caption" color="secondary">
          Price ($)
        </Text>
        <Text variant="caption" color="secondary" rightAlign>
          Size ({selectedAsset})
        </Text>
        <Text variant="caption" color="secondary" rightAlign>
          Time
        </Text>
      </HeaderContainer>
      <RecentTradesContainer>
        {!flatRecentTrades ? (
          <Text variant="caption">Loading...</Text>
        ) : flatRecentTrades?.length === 0 ? (
          <Text variant="caption">-</Text>
        ) : (
          <TradesTransitionGroup id="trades_container" exit={false}>
            {flatRecentTrades?.map((trade, index) => {
              return (
                <CSSTransition
                  /* toFixed() is different from toString() as the latter could
              potentially return a number string formatted in exponent form */
                  key={`recent-trade-${trade?.timestamp}-${index}`}
                  timeout={500}
                  classNames="card"
                >
                  <RecentTradeRow trade={trade} />
                </CSSTransition>
              );
            })}
          </TradesTransitionGroup>
        )}
      </RecentTradesContainer>
    </RecentTradesTableContainer>
  );
};
