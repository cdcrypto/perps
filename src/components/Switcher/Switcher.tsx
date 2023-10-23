import { Text } from "../Text";
import { TogglerContainer, Toggler, SwitcherWrap } from "./styles";

type SwitcherProps = {
  checked: boolean;
  onSwitch: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switcher = ({ checked, onSwitch: onToggle, disabled }: SwitcherProps) => {
  const colorByValue = checked ? "textActive" : "textEnabled";
  const textColor = disabled ? "textDisabled" : colorByValue;
  return (
    <SwitcherWrap onClick={() => { if (!disabled) { onToggle(!checked); } }}>
      <Text variant="body2" color={textColor}>{checked ? "ON" : "OFF"}</Text>
      <TogglerContainer disabled={disabled} $checked={checked}>
        <Toggler disabled={disabled} />
      </TogglerContainer>
    </SwitcherWrap>
  );
};
