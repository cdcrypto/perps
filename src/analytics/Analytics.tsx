import { ROUTES } from "@web/routes";
import { analytics } from "analytics";
import { AnalyticsLocation } from "analytics/interface";
import { ReactNode, useEffect } from "react";
import { useMatch } from "react-router-dom";

export enum AnalyticsEvent {
  ViewTCs,
  ViewTradePage,
  ViewAccountPage,
  ViewOrderbook,
  ViewRecentTrades,
  ViewPositions,
  ViewOpenOrders,
  ViewTradeHistory,
  ViewFundingHistory,
  ViewDepositModal,
  ViewWithdrawModal,
}

type AnalyticsProps = {
  eventType: AnalyticsEvent;
  children: ReactNode;
};

export const Analytics = ({ eventType, children }: AnalyticsProps) => {
  const match = useMatch(ROUTES.TRADE + "/*");
  const location: AnalyticsLocation = match ? "trade" : "account";

  useEffect(() => {
    if (!analytics.isInitialized) return;

    switch (eventType) {
      case AnalyticsEvent.ViewTCs:
        return analytics.viewTcs();
      case AnalyticsEvent.ViewTradePage:
        return analytics.viewTradePage();
      case AnalyticsEvent.ViewAccountPage:
        return analytics.viewAccountPage();
      case AnalyticsEvent.ViewOrderbook:
        return analytics.viewOrderbook();
      case AnalyticsEvent.ViewRecentTrades:
        return analytics.viewRecentTrades();
      case AnalyticsEvent.ViewPositions:
        return analytics.viewPositions(location);
      case AnalyticsEvent.ViewOpenOrders:
        return analytics.viewOpenOrders(location);
      case AnalyticsEvent.ViewTradeHistory:
        return analytics.viewTradeHistory(location);
      case AnalyticsEvent.ViewFundingHistory:
        return analytics.viewFundingHistory(location);
      case AnalyticsEvent.ViewDepositModal:
        return analytics.openDepositModal(location);
      case AnalyticsEvent.ViewWithdrawModal:
        return analytics.openWithdrawModal(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType]);

  return <>{children}</>;
};
