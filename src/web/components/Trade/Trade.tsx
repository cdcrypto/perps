import { SideNavigation } from "@components/SideNavigation";
import { useSwitchAsset } from "@hooks/useSwitchAsset";
import { assetToTradeSlug } from "@utils/general";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Analytics, AnalyticsEvent } from "analytics";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUserSettings, useZetaStore } from "stores";
import {
  AssetMetrics,
  Chart,
  Orderbook,
  Orderform,
  Portfolio,
  TradeContainer,
  TradeGrid,
} from "./styles";

// named as Component to support React Router lazy routes
export function Component() {

  const navigate = useNavigate();
  const switchAsset = useSwitchAsset();
  const assetParam = useLoaderData() as Asset;
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const defaultAsset = useUserSettings((s) => s.defaultAsset);

  useEffect(() => {
    if (assetParam === Asset.UNDEFINED) {
      navigate(assetToTradeSlug(defaultAsset), { replace: true });
    }
  }, [assetParam, navigate, defaultAsset]);

  useEffect(() => {
    /** This logic is defined here an not in `router` since
     * we need to access the `useLocalStore` and use loader data
     */
    if (assetParam !== Asset.UNDEFINED && isInitialized) {
      switchAsset(assetParam);
    }
  }, [isInitialized, switchAsset, assetParam]);

  return (
    <Analytics eventType={AnalyticsEvent.ViewTradePage}>
      <TradeContainer>
        <SideNavigation />
        <TradeGrid>
          <AssetMetrics />
          <Orderform />
          {process.env.NODE_ENV !== "test" &&  <Chart />}
          <Orderbook />
          <Portfolio />
        </TradeGrid>
      </TradeContainer>
    </Analytics>
  );
}

Component.displayName = "Trade";
