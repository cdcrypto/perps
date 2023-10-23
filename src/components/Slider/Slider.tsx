import { useMemo } from "react";
import { SliderContainer, StyledSlider, ThumbInner } from "./styles";
import { SliderIndicator } from "./SliderIndicator";
interface SliderProps {
  /**
   * Handles the value change when the thumb of the slider is moved
   */
  onChange: (value: number) => void;
  /**
   * The current value of the thumb
   */
  value: number;
  min: number;
  max: number;
  precision: number;
  tagValue: string;
  disabled?: boolean;
  className?: string;
  step?: number;
}

export const Slider = ({
  onChange: handleChange,
  value,
  min,
  max,
  precision,
  tagValue,
  disabled = false,
  className,
  step: propsStep,
}: SliderProps) => {
  const step = useMemo(() => {
    if (propsStep) {
      return propsStep;
    }
    return 1 / Math.pow(10, precision);
  }, [precision, propsStep]);

  return (
    <SliderContainer className={className}>
      <StyledSlider
        className="slider"
        disabled={disabled}
        markClassName="no-mark"
        onChange={(value) => {
          if (typeof value === "number") {
            // we only support 1 thumb, so this will be safe.
            // value is only an array when there is more than 1 thumb
            handleChange(value);
          }
        }}
        value={value}
        min={min}
        max={max}
        step={step}
        renderThumb={(props) => <ThumbInner {...props} />}
      />
      <SliderIndicator active={value !== 0}>{tagValue}</SliderIndicator>
    </SliderContainer>
  );
};
