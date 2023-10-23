import { Text } from "@components/Text";
import { TooltipContainer } from "./styles";
import { formatDailyFundingRate, formatTooltipTimestamp } from "./helpers";
import { TooltipProps } from "recharts";
import { getFundingRateColor } from "@components/FundingRate/FundingRate";

interface FundingRateTooltipProps extends TooltipProps<number, number> {
  payload?: PayloadItem[];
}

interface PayloadItem {
  payload: {
    time: number;
    value: number;
  };
}

export const FundingRateTooltip = ({
  active,
  payload,
}: FundingRateTooltipProps) => {
  if (!active || !Array.isArray(payload) || !payload.length) {
    return null;
  }

  const item = payload[0];
  const { time, value } = item.payload;
  const formattedTimestamp = formatTooltipTimestamp(time);
  const formattedFundingRate = formatDailyFundingRate(value);
  const color = getFundingRateColor(value);

  return (
    <TooltipContainer>
      <Text variant="h5" color={color}>
        {formattedFundingRate}
      </Text>
      <Text variant="microtext" color="secondary">
        {formattedTimestamp}
      </Text>
    </TooltipContainer>
  );
};
