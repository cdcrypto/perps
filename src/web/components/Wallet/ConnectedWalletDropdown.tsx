import { Dropdown } from "@components/Dropdown";
import { DropdownProps } from "@components/Dropdown/Dropdown";
import { useUserSettings } from "stores";
import { useTheme } from "styled-components";

export const ConnectedWalletDropdown = (props: DropdownProps<undefined>) => {
  const theme = useTheme();

  const displayWalletAddress = useUserSettings((s) => s.displayWalletAddress);
  return (
    <Dropdown
      styles={{
        control: (_, state) => ({
          background: "none",
          color: theme.typography.clickable.enabled,
          border: "transparent",
          "&:focus": {
            background: "none",
            color: theme.typography.clickable.enabled,
          },
          ...(state.menuIsOpen
            ? {
              "&&": {
                background: "none",
                color: theme.typography.clickable.enabled,
              },
            }
            : {}),
        }),
        menu: (baseStyles) => ({ ...baseStyles, width: "auto", marginLeft: displayWalletAddress ? "0" : "-110px" }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: theme.typography.clickable.enabled,
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "19.2px",
        }),
      }}
      {...props}
    />
  );
};
