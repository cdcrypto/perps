import {
  useElementBounds,
  ElementBounds,
} from "@hooks/utility/useElementBounds";
import React from "react";
import { useEffect } from "react";
import { StyledTab } from "./styles";
import { WebTarget } from "styled-components";

export interface TabProps {
  /**
   * Index of tab
   */
  index?: number;
  /**
   * Is tab selected?
   */
  isSelected?: boolean;
  /**
   * Callback when another tab is selected
   */
  onTabSelected?: (tabBounds: ElementBounds) => void;
  children?: React.ReactNode;
  /**
   * Update index of tab selected
   */
  onClick?: () => void;
  /**
   * Which type of tab should this be?
   */
  variant?: "default" | "underlined";
  /**
   * Start adornment displayed before children
   */
  startAdornment?: React.ReactNode;
  /**
   * End adornment displayed after children
   */
  endAdornment?: React.ReactNode;

  as?: WebTarget;
  className?: string;

  testId?: string;
}

export const Tab = ({
  index,
  isSelected,
  onTabSelected,
  children,
  onClick,
  variant = "default",
  startAdornment: StartAdornment,
  endAdornment: EndAdornment,
  as,
  testId,
  className,
}: TabProps) => {
  const [setRef, tabBounds] = useElementBounds<HTMLButtonElement>();

  useEffect(() => {
    if (onTabSelected && isSelected) {
      onTabSelected(tabBounds);
    }
  }, [index, isSelected, onTabSelected, tabBounds]);

  return (
    <StyledTab
      data-testid={testId}
      as={as}
      $variant={variant}
      onClick={() => {
        onClick?.();
      }}
      $isSelected={isSelected}
      ref={setRef}
      className={className}
    >
      {StartAdornment}
      {children}
      {EndAdornment}
    </StyledTab>
  );
};
