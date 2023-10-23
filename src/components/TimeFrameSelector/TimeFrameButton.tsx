import { Text } from "@components/Text";
import { TimeFrame, timeFrameDisplayNames } from "./TimeFrameSelector";
import { ButtonContainer } from "./styles";
import { TextColor } from "@components/Text/styles";

interface TimeFrameButtonProps {
  selected: boolean;
  timeFrame: TimeFrame;
  setSelectedTimeFrame: (timeframe: TimeFrame) => void;
}

export const TimeFrameButton = ({
  selected,
  timeFrame,
  setSelectedTimeFrame,
}: TimeFrameButtonProps) => {
  const displayName = timeFrameDisplayNames[timeFrame];
  const color: TextColor = selected ? "highlight" : "textEnabled";

  const handleClick = () => {
    setSelectedTimeFrame(timeFrame);
  };

  return (
    <ButtonContainer $selected={selected} onClick={handleClick}>
      <Text variant="label" color={color}>
        {displayName}
      </Text>
    </ButtonContainer>
  );
};
