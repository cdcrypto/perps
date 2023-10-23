import DropdownArrow from "@assets/DropdownArrow";
import { DropdownPlaceholder } from "@components/Dropdown/styles";
import { useMemo } from "react";
import Select, {
  ActionMeta,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import { useTheme } from "styled-components";
import { DWDItem, DWDItemDescription, DWDItemLabel } from "./styles";

export interface DropdownWithDescriptionOption<T = unknown> {
  value: string;
  label: string;
  description: string;
  data?: T;
}

export interface DropdownWithDescriptionProps<T> {
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
   * Current value of dropdown
   */
  value?: DropdownWithDescriptionOption<T> | null;
  /**
   * Dropdown options
   */
  options: DropdownWithDescriptionOption<T>[];
  /**
   * Callback when dropdown value changes
   */
  onChange?: (
    newValue: SingleValue<DropdownWithDescriptionOption<T>>,
    actionMeta: ActionMeta<DropdownWithDescriptionOption<T>>
  ) => void;

  styles?: StylesConfig<
    DropdownWithDescriptionOption<T>,
    false,
    GroupBase<DropdownWithDescriptionOption<T>>
  >;

  className?: string;
}

export const DropdownWithDescription = <T,>({
  value,
  onChange: handleChange,
  isDisabled,
  options,
  placeholderText,
  placeholderIcon,
  styles = {},
  className,
}: DropdownWithDescriptionProps<T>) => {
  const theme = useTheme();

  const DropdownIndicator = useMemo(
    () =>
      function DropdownIndicator(
        props: DropdownIndicatorProps<
          DropdownWithDescriptionOption<T>,
          false,
          GroupBase<DropdownWithDescriptionOption<T>>
        >
      ) {
        return (
          <components.DropdownIndicator {...props}>
            <DropdownArrow height="16" color="textEnabled" />
          </components.DropdownIndicator>
        );
      },
    []
  );

  return (
    <Select
      className={className}
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
        return option.label;
      }}
      value={value}
      onChange={handleChange}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          background: theme.plum[400],
          cursor: "pointer",
          border: "none",
          color: theme.typography.highlight,
          boxShadow: "unset",
          borderRadius: "8px",
          alignItems: "center",
          fontWeight: "400",
          "&:hover": {
            border: "none",
            boxShadow: "none",
          },
          "&:focus": {
            background: theme.plum[100],
            color: theme.typography.highlight,
          },
          ...(state.isDisabled
            ? {
                "&&": {
                  background: theme.plum[500],
                  color: theme.typography.clickable.disabled,
                },
              }
            : {}),
          ...(state.menuIsOpen
            ? {
                "&&": {
                  background: theme.plum[100],
                  color: theme.typography.highlight,
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
          maxHeight: "none",
          ...(styles?.menuList ? styles.menuList(baseStyles, state) : {}),
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
          background: "#1E132D",
          fontWeight: "400",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          borderBottom: "1px solid #10081A",
          ...(state.isSelected
            ? { color: theme.typography.highlight }
            : { color: theme.typography.clickable.enabled }),
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
            background: theme.grey[600],
          },
          ...(styles?.option ? styles.option(baseStyles, state) : {}),
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: theme.typography.highlight,
          ...(styles?.singleValue ? styles.singleValue(baseStyles, state) : {}),
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          transition: "all .2s ease",
          transform: state.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : undefined,
          color: theme.typography.clickable.enabled,
          "&:hover": {
            color: theme.typography.clickable.enabled,
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
          height: "48px",
          ...(styles?.indicatorsContainer
            ? styles.indicatorsContainer(baseStyles, state)
            : {}),
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "24px",
          color: theme.typography.secondary,
          ...(state.isDisabled
            ? {
                "&&": {
                  color: theme.typography.clickable.disabled,
                },
              }
            : {}),
        }),
      }}
      components={{
        DropdownIndicator,
        Option: AocOption,
      }}
    />
  );
};

function AocOption<T>(
  props: OptionProps<
    DropdownWithDescriptionOption<T>,
    false,
    GroupBase<DropdownWithDescriptionOption<T>>
  >
) {
  return (
    <components.Option {...props}>
      <DWDItem>
        <DWDItemLabel>{props.data.label}</DWDItemLabel>
        <DWDItemDescription>{props.data.description}</DWDItemDescription>
      </DWDItem>
    </components.Option>
  );
}
