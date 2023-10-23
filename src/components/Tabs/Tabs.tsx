import React from "react";
import { useState, useCallback } from "react";
import { StyledTabs, TabIndicator } from "./styles";
import {
  useElementBounds,
  ElementBounds,
} from "@hooks/utility/useElementBounds";
import { TabProps } from "./Tab";

export interface TabsProps {
  /**
   * Index of currently selected tab
   */
  selectedIndex: number;
  /**
   * Callback when another tab is selected
   */
  onChange?: (index: number) => void;
  /**
   * Which type of group of tabs should this be?
   */
  variant?: "default" | "underlined";
  tabIndicator?: React.ReactElement<{
    style?: React.CSSProperties;
    variant?: "default" | "underlined";
  }>;
  children?: React.ReactElement<TabProps>[];
  className?: string;
}

export const Tabs = ({
  onChange,
  selectedIndex,
  variant = "default",
  tabIndicator,
  children,
  className,
}: TabsProps) => {
  const [indicatorStyles, setIndicatorStyles] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
  });

  const [ref, { left }] = useElementBounds<HTMLDivElement>();

  /**
   * TabIndicator is absolutely positioned to the relative positioning of the StyledTabs.
   * Therefore we need to adjust the left positioning due to how the StyledTab is positioned on the screen.
   */
  const onTabSelected = useCallback(
    (tabBounds: ElementBounds) => {
      setIndicatorStyles({
        left: tabBounds.left - left,
        width: tabBounds.width,
      });
    },
    [left]
  );

  return (
    <StyledTabs ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            index,
            isSelected: selectedIndex === index,
            onTabSelected,
            onClick: () => {
              child.props.onClick?.();
              onChange?.(index);
            },
            variant,
          });
        }
        return child;
      })}
      {!React.isValidElement(tabIndicator) ? (
        <TabIndicator style={indicatorStyles} variant={variant} />
      ) : (
        React.cloneElement(tabIndicator, {
          style: indicatorStyles,
          variant,
        })
      )}
    </StyledTabs>
  );
};
