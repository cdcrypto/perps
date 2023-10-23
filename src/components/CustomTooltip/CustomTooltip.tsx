import "react-tooltip/dist/react-tooltip.css";
import { PlacesType } from "react-tooltip";
import { StyledTooltip, ChildWrapper } from "@components/Tooltip/styles";
import { customAlphabet } from "nanoid";
import { ReactNode, useRef } from "react";

// custom alphabet is used to generate a unique id for each tooltip
// as classNames cannot start with a number
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);

type CustomTooltipProps = {
  /**
   * This is the text within the tooltip, separated by the header and body content
   */
  content: ReactNode;
  /**
   * The element that you hover over to view the tooltip
   */
  children: JSX.Element | string;
  /**
   * Top or bottom positioning of the tooltip
   */
  tooltipPosition?: PlacesType;
  className?: string;
};

export const CustomTooltip = ({
  content,
  children,
  tooltipPosition = "bottom",
  className,
}: CustomTooltipProps) => {
  const tooltipClassSelector = useRef<string>(nanoid());

  const tooltipClassName =
    tooltipClassSelector.current +
    (className !== undefined ? " " + className : "");

  return (
    <>
      <ChildWrapper className={tooltipClassName}>{children}</ChildWrapper>
      <StyledTooltip
        noArrow
        anchorSelect={`.${tooltipClassSelector.current}`}
        place={tooltipPosition}
      >
        {content}
      </StyledTooltip>
    </>
  );
};
