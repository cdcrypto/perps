import {
  TimeFrame,
  TimeFrameSelector,
} from "@components/TimeFrameSelector/TimeFrameSelector";
import { useMemo, useState } from "react";
import { Container, ChartContainer, StyledFundingChart } from "./styles";
import { useDailyFundingRateHistory } from "@hooks/api/useFundingRateHistory";
import { useMarketDetails } from "@hooks/useMarketDetails";
import { generateFlatData } from "../EquityChart/Chart/helpers";
import { FundingRateDisplay } from "@components/Chart/FundingRateChart/FundingRateDisplay";

export const calculateFundingRate = (
  dailyFundingRate: number,
  timeFrame: TimeFrame
) => {
  switch (timeFrame) {
    case TimeFrame.ONE_HOUR:
      return dailyFundingRate / 24;
    case TimeFrame.FOUR_HOURS:
      return dailyFundingRate / 6;
    case TimeFrame.EIGHT_HOURS:
      return dailyFundingRate / 3;
    case TimeFrame.ONE_DAY:
      return dailyFundingRate;
    case TimeFrame.ANNUALIZED:
      return dailyFundingRate * 365;
  }
};

const defaultData = generateFlatData().map((tuple) => ({
  time: tuple.x,
  value: 0,
}));

export const FundingRateChartContainer = () => {
  const [timeFrame, setTimeFrame] = useState(TimeFrame.ONE_HOUR);
  const { selectedAsset } = useMarketDetails();
  const fundingHistory = useDailyFundingRateHistory(selectedAsset);

  const formattedHistory = useMemo(() => {
    return fundingHistory.map((tuple) => ({
      time: tuple.time,
      value: calculateFundingRate(tuple.value, timeFrame),
    }));
  }, [timeFrame, fundingHistory]);

  const chartData =
    formattedHistory.length > 0 ? formattedHistory : defaultData;
  const showTooltip = formattedHistory.length > 0;

  return (
    <Container>
      <TimeFrameSelector
        selectedTimeFrame={timeFrame}
        setSelectedTimeFrame={setTimeFrame}
      />

      <FundingRateDisplay asset={selectedAsset} timeFrame={timeFrame} />

      <ChartContainer>
        <StyledFundingChart data={chartData} showTooltip={showTooltip} />
      </ChartContainer>
    </Container>
  );
};
