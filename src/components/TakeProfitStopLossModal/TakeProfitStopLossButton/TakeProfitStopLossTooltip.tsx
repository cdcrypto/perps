import {
  BodyRow,
  Column,
  HeaderRow,
  TooltipBodyText,
  TooltipHeaderText,
} from "./styles";
import { convertDollarNumberToString } from "@utils/general";

interface TakeProfitStopLossTooltipProps {
  nearestTakeProfitPrice: number | false;
  nearestStopLossPrice: number | false;
}

export const TakeProfitStopLossTooltip = ({
  nearestTakeProfitPrice,
  nearestStopLossPrice,
}: TakeProfitStopLossTooltipProps) => {
  const takeProfitStr = nearestTakeProfitPrice
    ? convertDollarNumberToString(nearestTakeProfitPrice, 2, 2)
    : "n/a";
  const stopLossStr = nearestStopLossPrice
    ? convertDollarNumberToString(nearestStopLossPrice, 2, 2)
    : "n/a";

  return (
    <Column>
      <HeaderRow>
        <TooltipHeaderText variant="body1" color="long">
          TP
        </TooltipHeaderText>
        <TooltipHeaderText variant="body1" color="secondary">
          /
        </TooltipHeaderText>
        <TooltipHeaderText variant="body1" color="short">
          SL
        </TooltipHeaderText>
      </HeaderRow>

      <BodyRow>
        <TooltipBodyText variant="body1" color="long">
          {takeProfitStr}
        </TooltipBodyText>
        <TooltipBodyText variant="body1" color="secondary">
          /
        </TooltipBodyText>
        <TooltipBodyText variant="body1" color="short">
          {stopLossStr}
        </TooltipBodyText>
      </BodyRow>
    </Column>
  );
};
