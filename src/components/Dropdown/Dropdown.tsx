import Select, {
  ActionMeta,
  GroupBase,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import { DropdownItem, DropdownItemLabel, DropdownPlaceholder } from "./styles";
import DropdownArrow from "@assets/DropdownArrow";

import React from "react";

export interface DropdownOption<T = unknown> {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  data?: T;
}

export interface DropdownProps<T> {
  /**
   * Default placeholder text for dropdown
   * */
  placeholderText?: string | JSX.Element;
  /**
   * Optional placeholder icon
   * */
  placeholderIcon?: JSX.Element;
  /**
   * Is dropdown disabled?
   * */
  isDisabled?: boolean;
  /**
   * How large should the dropdown be?
   */
  size?: "small" | "default";
  /**
   * Current value of dropdown
   */
  value?: DropdownOption<T> | null;
  /**
   * Dropdown options
   */
  options: DropdownOption<T>[];
  /**
   * Callback when dropdown value changes
   */
  onChange?: (
    newValue: SingleValue<DropdownOption<T>>,
    actionMeta: ActionMeta<DropdownOption<T>>
  ) => void;

  styles?: StylesConfig<DropdownOption<T>, false, GroupBase<DropdownOption<T>>>;

  className?: string;

  testId?: string;
}

export const Dropdown = <T,>({
  value,
  onChange: handleChange,
  isDisabled,
  size = "default",
  options,
  placeholderText,
  placeholderIcon,
  styles = {},
  testId = "",
  className,
}: DropdownProps<T>) => {
  const classNameStr = className ? ` ${className} ${testId}` : testId;
  return (
    <Select
      className={classNameStr}
      placeholder={
        <DropdownPlaceholder>
          {placeholderIcon}
          {placeholderText}
        </DropdownPlaceholder>
      }
      isSearchable={false}
      isDisabled={isDisabled}
      name="color"
      options={options}
      menuPortalTarget={document.querySelector("body")} // Allows the menu to be visible even if parents hides overflow
      formatOptionLabel={(option) => {
        const elementTestId = `${testId}-${option.label?.toString() ?? ""}`;
        if (option.icon) {
          return (
            <DropdownItem data-testid={elementTestId}>
              {option.icon}
              <DropdownItemLabel>{option.label}</DropdownItemLabel>
            </DropdownItem>
          );
        }

        return <span data-testid={elementTestId}>{option.label}</span>;
      }}
      value={value}
      onChange={handleChange}
      // menuIsOpen={true}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          background: "#271736",
          cursor: "pointer",
          border: "none",
          color: "#F2E2FF",
          boxShadow: "unset",
          borderRadius: "8px",
          minHeight: size === "small" ? "32px" : "48px",
          height: size === "small" ? "32px" : "48px",
          fontSize: size === "small" ? "12px" : "16px",
          fontWeight: "400",
          "&:hover": {
            border: "none",
            boxShadow: "none",
          },
          "&:focus": {
            background: "#371F4F",
            color: "#F2E2FF",
          },
          ...(state.isDisabled
            ? {
              "&&": {
                background: "#1D0F2C",
                color: "#443358",
              },
            }
            : {}),
          ...(state.menuIsOpen
            ? {
              "&&": {
                background: "#371F4F",
                color: "#F2E2FF",
              },
            }
            : {}),
          ...(styles?.control ? styles.control(baseStyles, state) : {}),
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          ...(styles?.valueContainer
            ? styles.valueContainer(baseStyles, state)
            : {}),
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
          borderRadius: "6px",
          padding: "1px",
          background: "linear-gradient(133.21deg, #FFC4B0 0%, #F8B7B5 12%, #E795C2 33%, #CB5FD8 61%, #A414F5 95%, #9E08FA 100%)",
          ...(styles?.menu ? styles.menu(baseStyles, state) : {}),
        }),
        menuList: (baseStyles, state) => ({
          ...baseStyles,
          padding: "1px",
          ...(styles?.menuList ? styles.menuList(baseStyles, state) : {}),
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
          background: "#1E132D",
          fontSize: size === "small" ? "12px" : "16px",
          height: size === "small" ? "32px" : "48px",
          fontWeight: "400",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          borderBottom: "1px solid #10081A",
          ...(state.isSelected ? { color: "#F2E2FF" } : { color: "#7A4EB2" }),
          "&:first-child": {
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          },
          "&:last-child": {
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
            borderBottom: "none",
          },
          "&:hover": {
            background: "#443358",
          },
          ...(styles?.option ? styles.option(baseStyles, state) : {}),
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "#F2E2FF",
          ...(styles?.singleValue ? styles.singleValue(baseStyles, state) : {}),
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          transition: "all .2s ease",
          transform: state.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : undefined,
          color: "#7A4EB2",
          "&:hover": {
            color: "#7A4EB2",
          },
          ...(styles?.dropdownIndicator
            ? styles.dropdownIndicator(baseStyles, state)
            : {}),
        }),
        indicatorSeparator: (baseStyles, state) => ({
          all: "unset",
          ...(styles?.indicatorSeparator
            ? styles.indicatorSeparator(baseStyles, state)
            : {}),
        }),
        indicatorsContainer: (baseStyles, state) => ({
          ...baseStyles,
          height: size === "small" ? "32px" : "48px",
          ...(styles?.indicatorsContainer
            ? styles.indicatorsContainer(baseStyles, state)
            : {}),
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "24px",
          color: "#6A7DA1",
          ...(state.isDisabled
            ? {
              "&&": {
                color: "#443358",
              },
            }
            : {}),
        }),
      }}
      components={{
        DropdownIndicator: (props) => {
          return (
            <components.DropdownIndicator {...props}>
              <DropdownArrow
                height={size === "small" ? 11 : 16}
                color="textEnabled"
              />
            </components.DropdownIndicator>
          );
        },
      }}
    />
  );
};
