import {
  BadgesContainer,
  DepositInputContainer,
  DepositWithdrawInput,
} from "./styles";
import { useState, useRef, useCallback } from "react";
import CancelIcon from "@assets/CancelIcon";
import { DEX_PRICE_PRECISION } from "@utils/constants";
import { PercentageSelector } from "@components/PercentageSelector";
import { Percentage } from "@components/PercentageSelector/PercentageSelector";

interface InputWithBadgesProps {
  value?: string;
  onChange: (value?: string) => void;
  max: number;
  label: string;
}
export const InputWithBadges = ({
  value,
  onChange: handleChange,
  label,
  max,
}: InputWithBadgesProps) => {
  const [selectedPercentageSize, setSelectedPercentageSize] = useState<
    Percentage | undefined
  >(100);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightText = isFocused || selectedPercentageSize !== undefined;

  const onPercentChangeSelect = useCallback(
    (percentage: Percentage, val: number) => {
      if (!isFocused) {
        setSelectedPercentageSize(percentage);
        handleChange(val.toString());
      }
    },
    [handleChange, isFocused]
  );

  return (
    <DepositInputContainer>
      <DepositWithdrawInput
        testId="deposit-withdraw-input"
        ref={inputRef}
        $highlight={highlightText}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        value={value}
        onValueChange={() => {
          setSelectedPercentageSize(undefined);
        }}
        setValue={handleChange}
        label={label}
        decimalScale={DEX_PRICE_PRECISION}
        max={max}
        onAction={() => {
          setSelectedPercentageSize(undefined);
          handleChange("");
        }}
        endAdornment={<CancelIcon />}
      />
      <BadgesContainer>
        <PercentageSelector
          percentage={selectedPercentageSize}
          onPercentageSelect={onPercentChangeSelect}
          max={max ?? 0}
        />
      </BadgesContainer>
    </DepositInputContainer>
  );
};
