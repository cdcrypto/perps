import { SliderIndicatorWrapper, SliderIndicatorTag } from "./styles";

type SliderIndicatorProps = {
  /**
   * The actual text component that is passed in
   */
  children: string | JSX.Element;
  /**
   * Is the slider indicator active?
   */
  active: boolean;
  className?: string;
};

export const SliderIndicator = ({
  children,
  active,
  className,
}: SliderIndicatorProps) => {
  return (
    <SliderIndicatorWrapper $active={active}>
      <SliderIndicatorTag className={className}>{children}</SliderIndicatorTag>
    </SliderIndicatorWrapper>
  );
};
