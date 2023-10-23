import { TVChartContainer } from "@components/TVChartContainer";
import { GridWrapper, TradeChartViewContainer } from "./styles";
import { useState } from "react";
import {
  ChartType,
  ChartTypeSelector,
} from "@components/ChartTypeSelector/ChartTypeSelector";
import { FundingRateChartContainer } from "../FundingRateChartContainer";

interface TradeChartViewProps {
  className?: string;
}

export const TradeChartView = ({ className }: TradeChartViewProps) => {
  const [chartType, setChartType] = useState(ChartType.Price);

  return (
    <TradeChartViewContainer className={className}>
      <ChartTypeSelector
        selectedChartType={chartType}
        setSelectedChartType={setChartType}
      />

      <GridWrapper $visible={chartType === ChartType.Price}>
        <TVChartContainer />
      </GridWrapper>

      {chartType === ChartType.FundingRate && <FundingRateChartContainer />}
    </TradeChartViewContainer>
  );
};
