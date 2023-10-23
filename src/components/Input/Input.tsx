import {
  NumberFormatValues,
  OnValueChange,
  SourceInfo,
} from "react-number-format";
import {
  ActionContainer,
  InputContainer,
  InputWrapper,
  StyledInput,
  EndAdornmentWrapper,
} from "./styles";
import { Text } from "@components/Text";
import {
  FocusEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface InputProps {
  /**
   * The value of the input
   */
  value: string | undefined;
  /**
   * setter for value
   */
  setValue: (newValue: string) => void;
  /**
   * Use this for side effects only, no value modification
   */
  onValueChange?: OnValueChange;
  /**
   * What is the max value of the input?
   */
  max?: number;
  /**
   * Optional icon before the input
   */
  icon?: JSX.Element;
  /**
   * The label of the action
   */
  action?: string;
  /**
   * The function that is fired when the action button is clicked
   */
  onAction?: () => void;
  /**
   * Label text for the input, which would go above the input
   */
  label?: string | JSX.Element;
  /**
   * Additional helper text for the input, which would go below the input
   */
  helperText?: string;
  /**
   * Optional suffix for the input
   */
  suffix?: string;
  /*
   * Number of decimals places to allow for the user input
   */
  decimalScale?: number;
  /**
   * End adornment displayed at the end of the input field
   */
  endAdornment?: React.ReactNode;
  /**
   * Does the label have a tooltip?
   */
  labelTooltip?: React.ReactNode;
  className?: string;
  /**
   * The onFocus event is called when the element (or some element inside of it) receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * The onBlur event handler is called when focus has left the element (or left some element inside of it).
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  testId?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    {
      className,
      value,
      setValue,
      onValueChange,
      max = Number.MAX_SAFE_INTEGER,
      icon,
      action,
      onAction,
      label,
      helperText,
      decimalScale,
      endAdornment: EndAdornment,
      onBlur,
      onFocus,
      testId,
      ...rest
    }: InputProps,
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>();
    const [changed, setChanged] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Keep the parent forward ref optional.
    useImperativeHandle(ref, () => ({
      inputRef: () => inputRef.current,
    }));

    useEffect(() => {
      if (localValue !== value) {
        // keep the input controlled
        setLocalValue(value);
        setChanged(true);
      } else if (changed) {
        // we set the value to the maximum so now jump to the end of the input
        const length = localValue?.length ?? 0;
        inputRef.current?.setSelectionRange(length, length);
        setChanged(false);
      }
    }, [localValue, value, changed]);

    const handleChange = (
      values: NumberFormatValues,
      sourceInfo: SourceInfo
    ) => {
      if (onValueChange) {
        onValueChange(values, sourceInfo);
      }

      if (setValue === undefined) {
        return;
      }

      const formattedValue = values.formattedValue;

      if (Number(formattedValue) >= max) {
        setValue(max.toString());
        setLocalValue(values.floatValue?.toString());
        return;
      } else {
        setValue(formattedValue);
        setLocalValue(formattedValue);
      }
    };

    return (
      <InputWrapper className={className}>
        {label && (
          <Text variant="caption" color="secondary">
            {label}
          </Text>
        )}
        <InputContainer>
          {icon}
          <StyledInput
            {...rest}
            data-testid={testId}
            onFocus={onFocus}
            onBlur={onBlur}
            valueIsNumericString
            placeholder="0.00"
            decimalScale={decimalScale ?? 6}
            // Cannot see a case where the user needs to input a negative number
            allowNegative={false}
            value={localValue ?? ""}
            onValueChange={handleChange}
            getInputRef={inputRef}
          />
          {action && (
            <ActionContainer onClick={onAction}>
              <Text variant="caption" color="primary">
                {action}
              </Text>
            </ActionContainer>
          )}
          {EndAdornment && (
            <EndAdornmentWrapper onClick={onAction}>
              {EndAdornment}
            </EndAdornmentWrapper>
          )}
        </InputContainer>
        {helperText && <Text variant="caption">{helperText}</Text>}
      </InputWrapper>
    );
  }
);
