import { useCallback, useMemo, useState } from "react";
import {
  ClientPortfolioContainer,
  ClientPortfolioHeaderText,
  ClientPortfolioTablesContainer,
} from "./styles";
import { PositionsTable } from "../PositionsTable";
import { OpenOrdersTable } from "../OpenOrdersTable";
import { TradeHistoryTable } from "../TradeHistoryTable";
import { ClientPortfolioTabs } from "./ClientTabs";
import { FundingHistoryTable } from "../FundingHistoryTable";
import { TransferHistoryTable } from "../TransferHistoryTable";
import { CancelAllOrdersButton } from "@components/CancelAllOrdersButton";
import { Analytics, AnalyticsEvent } from "analytics";
import { TriggerOrdersTable } from "../TriggerOrdersTable";
import { CancelAllTriggerOrdersButton } from "@components/CancelAllTriggerOrdersButton";

interface ClientPortfolioProps {
  className?: string;
  header?: string;
  showUserStateCTAs?: boolean;
  includeInitialMargin?: boolean;
}

export enum ClientPortfolioTab {
  Positions,
  OpenOrders,
  TriggerOrders,
  TradeHistory,
  FundingHistory,
  TransferHistory,
}

export const ClientPortfolio = ({
  className,
  header,
  showUserStateCTAs,
  includeInitialMargin = false,
}: ClientPortfolioProps) => {
  const [tabIndex, setTabIndex] = useState<ClientPortfolioTab>(
    ClientPortfolioTab.Positions
  );

  const handleTabChange = useCallback((newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }, []);

  const switchToTriggerOrdersTab = useCallback(() => {
    setTabIndex(ClientPortfolioTab.TriggerOrders);
  }, [setTabIndex]);

  const selectedTable = useMemo(() => {
    switch (tabIndex) {
      case ClientPortfolioTab.Positions:
        return (
          <Analytics eventType={AnalyticsEvent.ViewPositions}>
            <PositionsTable
              showUserStateCTAs={showUserStateCTAs}
              includeInitialMargin={includeInitialMargin}
              switchToTriggerOrdersTab={switchToTriggerOrdersTab}
            />
          </Analytics>
        );
      case ClientPortfolioTab.OpenOrders:
        return (
          <Analytics eventType={AnalyticsEvent.ViewOpenOrders}>
            <OpenOrdersTable showUserStateCTAs={showUserStateCTAs} />
          </Analytics>
        );
      case ClientPortfolioTab.TriggerOrders:
        return <TriggerOrdersTable showUserStateCTAs={showUserStateCTAs} />;
      case ClientPortfolioTab.TradeHistory:
        return (
          <Analytics eventType={AnalyticsEvent.ViewTradeHistory}>
            <TradeHistoryTable showUserStateCTAs={showUserStateCTAs} />
          </Analytics>
        );
      case ClientPortfolioTab.FundingHistory:
        return (
          <Analytics eventType={AnalyticsEvent.ViewFundingHistory}>
            <FundingHistoryTable showUserStateCTAs={showUserStateCTAs} />
          </Analytics>
        );
      case ClientPortfolioTab.TransferHistory:
        return <TransferHistoryTable showUserStateCTAs={showUserStateCTAs} />;
    }
  }, [
    showUserStateCTAs,
    tabIndex,
    includeInitialMargin,
    switchToTriggerOrdersTab,
  ]);

  return (
    <ClientPortfolioContainer className={className}>
      {header && (
        <ClientPortfolioHeaderText variant="h2" color="highlight">
          {header}
        </ClientPortfolioHeaderText>
      )}
      <ClientPortfolioTablesContainer>
        <ClientPortfolioTabs value={tabIndex} onChange={handleTabChange} />
        {tabIndex === ClientPortfolioTab.OpenOrders && (
          <CancelAllOrdersButton label="Cancel all" variant="tertiary" />
        )}

        {tabIndex === ClientPortfolioTab.TriggerOrders && (
          <CancelAllTriggerOrdersButton label="Cancel all" variant="tertiary" />
        )}
      </ClientPortfolioTablesContainer>
      {selectedTable}
    </ClientPortfolioContainer>
  );
};
