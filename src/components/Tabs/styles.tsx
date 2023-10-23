import { Text } from "@components/Text";
import styled, { css } from "styled-components";

export const StyledTab = styled.button<{
  $isSelected?: boolean;
  $variant?: "default" | "underlined";
}>`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 1;
  font-weight: 500;
  font-size: 12px;

  ${Text} {
    text-align: center;
    width: 100%;
  }

  color: ${({ $isSelected, theme: { typography: { clickable, highlight } }, $variant }) =>
    $isSelected ? ($variant === "underlined" ? clickable.active : highlight) : clickable.enabled
  };
`;

export const StyledTabs = styled.div<{
  variant?: "default" | "underlined";
}>`
  position: relative;
  display: flex;
  background: ${(props) => props.theme.plum[400]};
  border-radius: 8px;
`;

export const TabIndicator = styled.div<{
  variant?: "default" | "underlined";
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  box-sizing: border-box;
  transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
  ${({ variant, theme }) =>
    variant === "underlined"
      ? css`
          border-bottom: 2px solid ${theme.purple[100]}};
        `
      : variant === "default"
        ? css`
          border-radius: 8px;
          background: ${(props) => props.theme.plum[100]};
        `
        : null};
`;
