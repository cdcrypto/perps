import {
  RadioInput,
  RadioButton,
  RadioWrapper,
  RemoveRadioButton,
  RadioLabel,
} from "./styles";

interface RadioProps {
  /**
   * Is the Radio checked?
   */
  checked: boolean;
  /**
   * What happens when the Radio is checked or unchecked ?
   */
  onChange: (selected: string) => void;
  /**
   * Value of radio button
   */
  value: string | number | undefined;
  /**
   * Label of radio button
   */
  label: string;
  /**
   * How large should the button be?
   */
  size: "small" | "medium" | "large";
  /**
   * What logo should be used when radio button is selected?
   */
  selectedLogo?: "button" | "remove";
  className?: string;
}

export const Radio = ({
  checked,
  onChange: handleChange,
  value,
  label,
  size,
  selectedLogo,
  className,
}: RadioProps) => {
  return (
    <RadioWrapper size={size} className={className}>
      {selectedLogo === "remove" ? (
        <RemoveRadioButton size={size} checked={checked} />
      ) : (
        <RadioButton size={size} checked={checked} />
      )}
      <RadioLabel>{label}</RadioLabel>
      <RadioInput
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={value}
        checked={checked}
        type="radio"
      />
    </RadioWrapper>
  );
};
