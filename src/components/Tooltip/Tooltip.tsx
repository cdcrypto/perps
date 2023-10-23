import { Text } from "@components/Text";
import { customAlphabet } from "nanoid";
import { useRef } from "react";
import { PlacesType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useUserSettings } from "stores";
import { ChildWrapper, ParagraphText, StyledTooltip } from "./styles";

// custom alphabet is used to generate a unique id for each tooltip
// as classNames cannot start with a number
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);

type TooltipText = {
  header: string;
  body: string | string[];
};

type TooltipProps = {
  /**
   * This is the text within the tooltip, separated by the header and body content
   */
  content: TooltipText;
  /**
   * The element that you hover over to view the tooltip
   */
  children: JSX.Element | string;
  /**
   * Allow for a smaller version of the tooltip by making the header smaller
   */
  larger?: boolean;
  /**
   * Top or bottom positioning of the tooltip
   */
  tooltipPosition?: PlacesType;
  className?: string;

  /**
   * Add left offset - useful for most left tooltip to avoid navbar overlap
   */
  withLeftOffset?: true;
};

const TOOLTIP_STYLE_WITH_OFFSET = {
  marginLeft: "60px",
};

export const Tooltip = ({
  content,
  children,
  larger,
  tooltipPosition = "bottom",
  className,
  withLeftOffset,
}: TooltipProps) => {
  const tooltipClassSelector = useRef<string>(nanoid());

  // Disable tooltips in tests due to randomness nanoid
  const tooltipsEnabled = useUserSettings((s) => s.enableTooltips) && process.env.NODE_ENV !== "test";


  if (!tooltipsEnabled) {
    return <>{children}</>;
  }

  const tooltipClassName =
    tooltipClassSelector.current +
    (className !== undefined ? " " + className : "");
  const { header, body } = content;

  return (
    <>
      <ChildWrapper className={tooltipClassName}>{children}</ChildWrapper>
      <StyledTooltip
        noArrow
        anchorSelect={`.${tooltipClassSelector.current}`}
        place={tooltipPosition}
        style={withLeftOffset ? TOOLTIP_STYLE_WITH_OFFSET : undefined}
      >
        <>
          <Text variant={larger ? "body1" : "h5"} color="information">
            {header}
          </Text>

          {typeof body === "string" && (
            <Text variant="caption" color="primary">
              {body}
            </Text>
          )}

          {Array.isArray(body) &&
            body.map((paragraph, ind) => (
              <ParagraphText
                key={ind}
                variant="caption"
                color="primary"
                $isFirst={ind === 0}
              >
                {paragraph}
              </ParagraphText>
            ))}
        </>
      </StyledTooltip>
    </>
  );
};
