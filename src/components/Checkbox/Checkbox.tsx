import {
  InputCheckbox,
  CheckboxStyling,
  CheckboxWrapper,
  TickIcon,
} from "./styles";

interface CheckboxProps {
  /**
   * Is the toggle checked?
   */
  checked: boolean;
  /**
   * What happens when the toggle is checked or unchecked
   */
  onChange: (checked: boolean) => void;
  /**
   * How large should the button be?
   */
  size: "small" | "medium" | "large";
}

/** Toggles are fundamentally glorified checkboxes.
 *  This implementation makes it more
 *  accessible and inclusive for screen-readers */

export const Checkbox = ({
  checked,
  onChange: handleChange,
  size,
}: CheckboxProps) => {
  return (
    <CheckboxWrapper>
      <InputCheckbox
        checked={checked}
        onChange={(e) => {
          handleChange(e.target.checked);
        }}
        type="checkbox"
      />
      <CheckboxStyling size={size} checked={checked}>
        <TickIcon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </TickIcon>
      </CheckboxStyling>
    </CheckboxWrapper>
  );
};
