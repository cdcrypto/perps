import { OrderbookPriceIncrement } from "../../stores/useUserSettings";
import { Dropdown, DropdownProps } from "../Dropdown/Dropdown";
import { useTheme } from "styled-components";

export const OrderbookDropdown = (props: DropdownProps<OrderbookPriceIncrement>) => {
  const theme = useTheme();

  return (
    <Dropdown
      size="small"
      styles={{
        control: () => ({
          width: "79px",
          border: "0.5px solid transparent",
          padding: "0px 3px",
          height: "24px",
          minHeight: "24px",
          fontSize: "11px",
          fontWeight: "400",
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0px 3px",
          display: "flex",
          justifyContent: "flex-start",
        }),
        menu: () => ({
          width: "79px",
          fontSize: "12px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
          padding: "4px 8px",
          height: "24px",
          color: state.isSelected
            ? theme?.typography.highlight
            : theme?.typography.clickable.enabled,
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          padding: "0px",
          transition: "all .2s ease",
          transform: state.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : undefined,
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          all: "unset",
        }),
      }}
      {...props}
    />
  );
};
