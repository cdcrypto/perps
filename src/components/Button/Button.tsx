import {
  DefaultButton,
  ButtonLogo,
  ButtonLabel,
  SecondaryButton,
  TertiaryButton,
  WarningButton,
  BuyButton,
  SellButton,
  Button as RawButton,
} from "./styles";
import { TextColor } from "@components/Text/Text";
import BuyLogo from "@assets/logos/Buy";
import SellLogo from "@assets/logos/Sell";
import WarningLogo from "@assets/logos/Warning";
import WalletOutlinedLogo from "@assets/logos/Wallet/WalletOutlined";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The button label that is passed in
   */
  label: ReactNode;
  /**
   * Does the button have a left-sided logo?
   */
  logo?: boolean;
  /**
   * The style of button chosen, which largely dictates the design
   */
  variant?: "primary" | "secondary" | "tertiary" | "warning" | "buy" | "sell" | "raw";
  /**
   * The colour of the text and logo
   */
  color?: TextColor;
  className?: string;


  /**
   *  Test ID of button, useful in tests
   */
  testId?: string;
}

export const Button = ({
  label,
  logo = false,
  variant = "primary",
  color,
  className,
  testId,
  ...rest
}: ButtonProps) => {
  const { disabled, onClick } = rest;
  const logoRenderedCommon = logo && (
    <ButtonLogo>
      <WalletOutlinedLogo />
    </ButtonLogo>
  );
  switch (variant) {
    case "primary":
      return (
        <DefaultButton data-testid={testId} className={className} {...rest}>
          {logoRenderedCommon}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </DefaultButton>
      );
    case "secondary":
      return (
        <SecondaryButton
          data-testid={testId}
          className={className}
          disabled={disabled}
          onClick={onClick}
        >
          {logoRenderedCommon}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </SecondaryButton>
      );
    case "raw":
      return (
        <RawButton data-testid={testId} className={className} disabled={disabled} onClick={onClick}>
          {logoRenderedCommon}
          {label}
        </RawButton>
      );
    case "tertiary":
      return (
        <TertiaryButton
          data-testid={testId}
          className={className}
          disabled={disabled}
          onClick={onClick}
        >
          {logoRenderedCommon}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </TertiaryButton>
      );

    case "warning":
      return (
        <WarningButton
          data-testid={testId}
          className={className}
          disabled={disabled}
          onClick={onClick}
        >
          {logo && (
            <ButtonLogo>
              <WarningLogo />
            </ButtonLogo>
          )}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </WarningButton>
      );
    case "buy":
      return (
        <BuyButton data-testid={testId} className={className} disabled={disabled} onClick={onClick}>
          {logo && (
            <ButtonLogo>
              <BuyLogo />
            </ButtonLogo>
          )}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </BuyButton>
      );
    case "sell":
      return (
        <SellButton data-testid={testId} className={className} disabled={disabled} onClick={onClick}>
          {logo && (
            <ButtonLogo>
              <SellLogo />
            </ButtonLogo>
          )}
          <ButtonLabel color={color}>{label}</ButtonLabel>
        </SellButton>
      );
  }
};
