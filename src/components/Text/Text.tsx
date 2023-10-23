import styled from "styled-components";
import {
  Body1,
  Body2,
  Caption,
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label,
  Microtext,
  TextColor,
} from "./styles";
import { useUserSettings } from "stores";

export type { TextColor };

export type TextVariants =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "label"
  | "microtext";

type NativeTextProps = React.ComponentPropsWithoutRef<"p">;

export interface TextProps extends NativeTextProps {
  /**
   * The actual text component that is passed in
   */
  children: React.ReactNode;
  /**
   * The style of text chosen, which largely dictates the size
   */
  variant: TextVariants;
  /**
   * Is the text required to be bolded?
   */
  bold?: boolean;
  /**
   * The colour of the text
   */
  color?: TextColor;
  /**
   * Does the text require a dotted withTooltip underline?
   */
  dotted?: boolean;
  /**
   * Does the text wrapped by a tooltip? Need for hiding underlined dash.
   */
  withTooltip?: boolean;
  /**
   * Does the text require to be aligned to the right?
   */
  rightAlign?: boolean;
  /**
   * Does the text need to stay in one line?
   */
  noWrap?: boolean;
  className?: string;
}

export const Text = styled(
  ({
    children,
    variant,
    bold = false,
    dotted = false,
    withTooltip = false,
    rightAlign = false,
    noWrap = false,
    color,
    className,
  }: TextProps) => {
    const tooltipEnabled = useUserSettings((s) => s.enableTooltips);
    const showDots = dotted && (!withTooltip || tooltipEnabled);

    switch (variant) {
      case "display":
        return (
          <Display
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </Display>
        );
      case "h1":
        return (
          <H1
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H1>
        );
      case "h2":
        return (
          <H2
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H2>
        );
      case "h3":
        return (
          <H3
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H3>
        );
      case "h4":
        return (
          <H4
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H4>
        );
      case "h5":
        return (
          <H5
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H5>
        );

      case "h6":
        return (
          <H6
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </H6>
        );
      case "body1":
        return (
          <Body1
            $bold={bold}
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </Body1>
        );
      case "body2":
        return (
          <Body2
            $bold={bold}
            color={color}
            $dotted={showDots}
            $noWrap={noWrap}
            $rightAlign={rightAlign}
            className={className}
          >
            {children}
          </Body2>
        );
      case "caption":
        return (
          <Caption
            $bold={bold}
            color={color}
            $dotted={showDots}
            $rightAlign={rightAlign}
            $noWrap={noWrap}
            className={className}
          >
            {children}
          </Caption>
        );
      case "label":
        return (
          <Label
            color={color}
            className={className}
            $dotted={showDots}
            $noWrap={noWrap}
          >
            {children}
          </Label>
        );
      case "microtext":
        return (
          <Microtext
            color={color}
            className={className}
            $dotted={showDots}
            $noWrap={noWrap}
          >
            {children}
          </Microtext>
        );
    }
  }
)``;
