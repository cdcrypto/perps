import styled, { RuleSet, css } from "styled-components";

type BadgeVariant = "outlined" | "contained";

const BADGE_VARIANTS_STYLES: Record<BadgeVariant, RuleSet<object>> = {
  outlined: css`
    border: 1px solid #d6b1fe;`,
  contained: css`
    border: 1px solid transparent;`,
};

export const Badge = styled.div<{ $variant?: BadgeVariant }>`
  display: inline-flex;
  font-size: 11px;
  font-weight: 400;
  gap: 4px;
  padding: 4px 8px;
  min-width: 23px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.grey[700]};
  color: ${(props) => props.theme.typography.highlight};
  ${(props) => BADGE_VARIANTS_STYLES[props.$variant ?? "contained"]};
`;
