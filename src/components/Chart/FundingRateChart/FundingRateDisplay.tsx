import { TimeFrame } from "@components/TimeFrameSelector/TimeFrameSelector";
import { useDailyFundingRate } from "@hooks/calcs/useDailyFundingRate";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { FundingRateDisplayContainer } from "./styles";
import { Text } from "@components/Text";
import { getFundingRateColor } from "@components/FundingRate/FundingRate";
import { calculateFundingRate } from "@web/components/FundingRateChartContainer/FundingRateChartContainer";
import { convertNumberToString } from "@utils/general";

interface FundingRateDisplayProps {
  asset: Asset;
  timeFrame: TimeFrame;
}

export const FundingRateDisplay = ({
  asset,
  timeFrame,
}: FundingRateDisplayProps) => {
  const dailyFundingRate = useDailyFundingRate(asset);
  const timeFrameFundingRate = calculateFundingRate(
    dailyFundingRate * 100,
    timeFrame
  );
  const maxDecimals = timeFrame === TimeFrame.ANNUALIZED ? 2 : 5;
  const formattedRate = `${convertNumberToString(
    timeFrameFundingRate,
    2,
    maxDecimals
  )}%`;
  const color = getFundingRateColor(dailyFundingRate);

  return (
    <FundingRateDisplayContainer>
      <Text variant="label" color="secondary">
        Current {timeFrame} Rate
      </Text>

      <Text variant="label" color={color}>
        {formattedRate}
      </Text>
    </FundingRateDisplayContainer>
  );
};
