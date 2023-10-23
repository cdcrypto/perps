import styled, { css } from "styled-components";
import { Badge } from "@components/Badge";

export const ClickableBadge = styled(Badge)<{
  $isSelected: boolean;
}>`
  && {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    height: 32px;
    color: ${(props) => props.theme.typography.clickable.active};
    background: ${(props) => props.theme.plum[400]};
    border-radius: 24px;
    flex-grow: 1;
    ${({ $isSelected, theme }) =>
      $isSelected &&
      css`
        color: ${theme.typography.highlight};
        background: ${theme.plum[100]};
      `}
  }
`;
