import { TimeFrameButton } from "./TimeFrameButton";
import { Container } from "./styles";

export enum TimeFrame {
  ONE_HOUR = "1H",
  FOUR_HOURS = "4H",
  EIGHT_HOURS = "8H",
  ONE_DAY = "1D",
  ANNUALIZED = "Annualized",
}

export const timeFrameDisplayNames: { [key in TimeFrame]: string } = {
  [TimeFrame.ONE_HOUR]: "1H",
  [TimeFrame.FOUR_HOURS]: "4H",
  [TimeFrame.EIGHT_HOURS]: "8H",
  [TimeFrame.ONE_DAY]: "1D",
  [TimeFrame.ANNUALIZED]: "Annualized",
};

export interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  setSelectedTimeFrame: (timeFrame: TimeFrame) => void;
  className?: string;
}

export const TimeFrameSelector = ({
  selectedTimeFrame,
  setSelectedTimeFrame,
  className,
}: TimeFrameSelectorProps) => {
  return (
    <Container className={className}>
      {Object.values(TimeFrame).map((timeFrame) => (
        <TimeFrameButton
          key={timeFrame}
          selected={timeFrame === selectedTimeFrame}
          timeFrame={timeFrame}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
      ))}
    </Container>
  );
};
