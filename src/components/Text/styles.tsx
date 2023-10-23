import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export type TextColor =
  | "highlight"
  | "primary"
  | "secondary"
  | "tertiary"
  | "textEnabled"
  | "textActive"
  | "textDisabled"
  | "hyperlinkEnabled"
  | "hyperlinkHover"
  | "hyperlinkPressed"
  | "hyperlinkVisited"
  | "long"
  | "short"
  | "gradient"
  | "success"
  | "danger"
  | "caution"
  | "alert"
  | "warning"
  | "information"
  | "white";

const COLOR_MAPPINGS: Record<TextColor, (theme: DefaultTheme) => string> = {
  highlight: (theme) => theme.typography.highlight,
  primary: (theme) => theme.typography.primary,
  secondary: (theme) => theme.typography.secondary,
  tertiary: (theme) => theme.typography.tertiary,
  textEnabled: (theme) => theme.typography.clickable.enabled,
  textActive: (theme) => theme.typography.clickable.active,
  textDisabled: (theme) => theme.typography.clickable.disabled,
  hyperlinkEnabled: (theme) => theme.typography.hyperlink.enabled,
  hyperlinkHover: (theme) => theme.typography.hyperlink.hover,
  hyperlinkPressed: (theme) => theme.typography.hyperlink.pressed,
  hyperlinkVisited: (theme) => theme.typography.hyperlink.visited,
  long: (theme) => theme.typography.long,
  short: (theme) => theme.typography.short,
  gradient: (theme) => theme.typography.highlight,
  success: (theme) => theme.signals.success,
  danger: (theme) => theme.signals.danger,
  warning: (theme) => theme.signals.warning,
  caution: (theme) => theme.signals.caution,
  alert: (theme) => theme.signals.alert,
  information: (theme) => theme.signals.info,
  white: (theme) => theme.white,
};

export const Text = styled.p<{
  color?: TextColor;
  $dotted?: boolean;
  $rightAlign?: boolean;
  $noWrap?: boolean;
}>`
  margin: 0;
  text-align: ${(props) => (props.$rightAlign ? "end" : "start")};
  white-space: ${(props) => (props.$noWrap ? "nowrap" : "normal")};
  color: ${(props) => COLOR_MAPPINGS[props.color || "highlight"](props.theme)};

  ${(props) =>
    props.color === "gradient" &&
    css`
      background: ${props.theme.signals.info};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `};

  ${(props) =>
    props.$dotted &&
    css`
      text-decoration: underline;
      text-decoration-style: dashed;
      text-decoration-color: ${props.theme.signals.info};
      text-decoration-thickness: 0.5px;
      text-underline-offset: 5px;
    `}

  text-align: ${(props) => (props.$rightAlign ? "end" : "start")};
`;

export const Paragraph = styled(Text)<{ bold?: boolean }>`
  font-size: 16px;
  line-height: 116%;
  font-weight: ${(props) => (props.bold ? 700 : 400)};
`;

export const Overline = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const Legal = styled(Text)`
  font-size: 12px;
  font-weight: 400;
`;

export const Display = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
`;

export const H1 = styled(Text)`
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
`;
export const H2 = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;
export const H3 = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;
export const H4 = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
export const H5 = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`;

export const H6 = styled(Text)`
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
`;

export type WithBoldProps = { $bold?: boolean };

export const Body1 = styled(Text)<WithBoldProps>`
  font-size: 16px;
  font-weight: ${(props) => (props.$bold ? 700 : 400)};
  line-height: 24px;
`;

export const Body2 = styled(Text)<WithBoldProps>`
  font-size: 14px;
  font-weight: ${(props) => (props.$bold ? 500 : 400)};
  line-height: 20px;
`;

export const Caption = styled(Text)<WithBoldProps>`
  font-size: 12px;
  font-weight: ${(props) => (props.$bold ? 500 : 400)};
  line-height: 16px;
`;

export const Label = styled(Text)`
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
`;

export const Microtext = styled(Text)`
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
`;
