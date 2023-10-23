import Big from "big.js";
import { useEffect } from "react";
import { ClickableBadge } from "./styles";

export type Percentage = 25 | 50 | 75 | 100;

interface PercentageSectionProps {
  percentage?: Percentage;
  onPercentageSelect: (percentage: Percentage, value: number) => void;
  max: number;
}
export const PercentageSelector = ({
  percentage,
  onPercentageSelect: handlePercentageSelect,
  max,
}: PercentageSectionProps): JSX.Element => {
  /**
   * Update the returned value to parent whenever max changes
   */
  useEffect(() => {
    if (!percentage || !max) return;
    handlePercentageSelect(
      percentage,
      Big(max).times(Big(percentage).div(100)).toNumber()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);
  return (
    <>
      <ClickableBadge
        variant="contained"
        $isSelected={percentage === 25}
        onClick={() => {
          handlePercentageSelect(25, Big(max).times(0.25).toNumber());
        }}
      >
        25%
      </ClickableBadge>
      <ClickableBadge
        variant="contained"
        $isSelected={percentage === 50}
        onClick={() => {
          handlePercentageSelect(50, Big(max).times(0.5).toNumber());
        }}
      >
        50%
      </ClickableBadge>
      <ClickableBadge
        variant="contained"
        $isSelected={percentage === 75}
        onClick={() => {
          handlePercentageSelect(75, Big(max).times(0.75).toNumber());
        }}
      >
        75%
      </ClickableBadge>
      <ClickableBadge
        variant="contained"
        $isSelected={percentage === 100}
        onClick={() => {
          handlePercentageSelect(100, max);
        }}
      >
        100%
      </ClickableBadge>
    </>
  );
};
