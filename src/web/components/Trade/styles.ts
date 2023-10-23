import { OrderForm } from "@components/OrderForm";
import { AssetMetricsBar } from "@web/components/AssetMetricsBar";
import { ClientPortfolio } from "@web/components/ClientPortfolio";
import { OrderbookTrades } from "@components/OrderbookTrades";
import styled, { css } from "styled-components";
import { TradeChartView } from "../TradeChartView";

export const TradeGrid = styled.div`
  margin: 4px;
  gap: 4px;
  flex-grow: 1;
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 56px minmax(300px, 1fr) 1.5fr minmax(300px, 1fr);
  grid-template-areas:
    "asset-metrics asset-metrics"
    "chart chart"
    "orderbook orderform"
    "portfolio portfolio";
  min-height: 1100px;
  height: calc(100vh - 104px);

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr 300px 300px;
    grid-template-rows: 56px 2fr minmax(275px, 1fr);
    grid-template-areas:
      "asset-metrics asset-metrics orderform"
      "chart orderbook orderform"
      "portfolio portfolio orderform";
    min-height: 840px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-rows: 56px minmax(300px, 2fr) minmax(275px, 1fr);
    min-height: 840px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-areas:
      "asset-metrics asset-metrics orderform"
      "chart orderbook orderform"
      "portfolio orderbook orderform";
  }
`;
const IslandStyling = css`
  border-radius: 12px;
`;
export const AssetMetrics = styled(AssetMetricsBar)`
  grid-area: asset-metrics;
  ${IslandStyling}
`;
export const Orderform = styled(OrderForm)`
  grid-area: orderform;
  ${IslandStyling}
`;
export const Chart = styled(TradeChartView)`
  grid-area: chart;
  overflow: hidden; /* Need for border radius to work */
  ${IslandStyling}
`;
// NOTE: There exists logic rendering based on screen width within this component
export const Orderbook = styled(OrderbookTrades)`
  grid-area: orderbook;
  ${IslandStyling}
`;
export const Portfolio = styled(ClientPortfolio)`
  /* background: #0d0080; */
  grid-area: portfolio;
  ${IslandStyling}
`;

export const TradeContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    z-index: -1;
  }
`;
