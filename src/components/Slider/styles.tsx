import { styled } from "styled-components";
import ReactSlider from "react-slider";

/**
 * Thumb is the button that slides along the slider
 * Track is the slider bar.
 * Mark is the circle that appears at each step.
 */

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 40px;

  & .no-mark {
    display: none;
  }
  & .mark {
    width: 1px;
    height: 1px;
    background-color: ${(props) => props.theme.purple[100]};
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
    bottom: calc(50% - 1px);
    margin: 0 7px;
  }

  & .track {
    position: relative;
    background: ${(props) => props.theme.grey[700]};
    border-radius: 2px;

    top: 20px;
    height: 4px;
    margin: 0 7px;
  }

  & .track-1 {
    margin: 0 5px;
  }

  & .track-0 {
    background: ${(props) => props.theme.gradient[100]};
  }
`;

export const ThumbInner = styled.div`
  cursor: pointer;
  z-index: 100;
  top: 11px;
  border: none;
  display: block;
  line-height: 38px;
  outline: none;

  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background: #e4e2fa;
`;

/**
 * Slider Indicator
 */

export const SliderIndicatorWrapper = styled.div<{
  $active: boolean;
}>`
  position: relative;
  border-radius: 8px;
  min-width: 56px;
  height: 26px;
  padding: 1px;
  box-sizing: border-box;
  background: ${(props) =>
    props.$active ? props.theme.gradient[100] : props.theme.plum[400]};
  color: ${(props) =>
    props.$active
      ? props.theme.typography.highlight
      : props.theme.typography.secondary};
`;

export const SliderIndicatorTag = styled.div`
  display: inline-flex;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  gap: 4px;
  padding: 2px 8px;
  min-width: 54px;
  height: 24px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  top: 1px;
  right: 1px;

  background: ${(props) => props.theme.plum[400]};
`;
