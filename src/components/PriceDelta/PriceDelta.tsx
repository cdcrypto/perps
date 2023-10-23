import { Text } from "@components/Text";

import { useMemo } from "react";
import { PriceDeltaContainer, PercentageText } from "./styles";
import { convertDollarNumberToString } from "@utils/general";
import { TextVariants } from "@components/Text/Text";
import NegativeArrow from "@assets/NegativeArrow";
import PositiveArrow from "@assets/PositiveArrow";

interface PriceDeltaProps {
  delta?: number;
  deltaPercentage?: number;
  /**
   * Remove delta icon
   */
  removeIcon?: boolean;
  /**
   * Allow for different sizes in text
   */
  variant: TextVariants;
  /**
   * Does the price delta need to be aligned to the right?
   */
  rightAlign?: boolean;
  /**
   * Is the the text required to be bold?
   */
  bold?: boolean;
  /**
   * Table representation of price delta (no bracket, column format and right alignment)
   */
  tableRepresentation?: boolean;
  /**
   * Minimum decimal point precision for delta
   */
  deltaMinPrecision?: number;
  /**
   * Maximum decimal point precision for delta
   */
  deltaMaxPrecision?: number;
  className?: string;
}

export const PriceDelta = ({
  delta,
  deltaPercentage,
  removeIcon,
  variant,
  rightAlign,
  bold,
  tableRepresentation = false,
  deltaMinPrecision,
  deltaMaxPrecision,
  className,
}: PriceDeltaProps) => {
  const deltaType: "neutral" | "loss" | "profit" = useMemo(() => {
    const selectedDelta = (delta ?? deltaPercentage) || 0;
    if (selectedDelta === 0) return "neutral";
    if (selectedDelta < 0) return "loss";
    return "profit";
  }, [delta, deltaPercentage]);

  const isProfitSymbol = useMemo(() => {
    if (deltaType === "profit") {
      return "+";
    } else return "";
  }, [deltaType]);

  const deltaPercentageStr = useMemo(() => {
    if (
      deltaPercentage === undefined ||
      isNaN(deltaPercentage) ||
      !isFinite(deltaPercentage)
    )
      return "";

    if (deltaPercentage < 0.01 && deltaPercentage > 0)
      return tableRepresentation ? "0%" : "(0%)";

    const percentageStr = deltaPercentage.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (tableRepresentation || !delta) {
      return deltaPercentage < 0 ? `${percentageStr}%` : `+${percentageStr}%`;
    }
    return `(${isProfitSymbol}${percentageStr}%)`;
  }, [delta, deltaPercentage, isProfitSymbol, tableRepresentation]);

  const dollarDeltaStr = useMemo(() => {
    if (delta === undefined) return "";
    const absDelta = Math.abs(delta);
    // TODO: Account for too large of a percentage -> infinity?
    if (absDelta < 0.01 && absDelta > 0) return "<$0.01";
    return convertDollarNumberToString(
      absDelta,
      deltaMinPrecision,
      deltaMaxPrecision ?? 2
    );
  }, [delta, deltaMinPrecision, deltaMaxPrecision]);

  const icon = useMemo(() => {
    switch (deltaType) {
      case "profit":
        return <PositiveArrow />;
      case "loss":
        return <NegativeArrow />;
      default:
        return <></>;
    }
  }, [deltaType]);

  return (
    <PriceDeltaContainer
      className={className}
      $rightAlign={rightAlign}
      $tableRepresentation={tableRepresentation}
    >
      <Text
        bold={bold}
        variant={variant}
        color={
          deltaType === "profit"
            ? "long"
            : deltaType === "loss"
            ? "short"
            : "primary"
        }
        noWrap
      >
        {dollarDeltaStr}
      </Text>
      {deltaPercentageStr && (
        /**
         * Separate to allow for styling difference
         */ <PercentageText
          bold={bold}
          variant={variant}
          color={
            deltaType === "profit"
              ? "long"
              : deltaType === "loss"
              ? "short"
              : "primary"
          }
          noWrap
        >
          {deltaPercentageStr}
        </PercentageText>
      )}
      {!removeIcon && icon}
    </PriceDeltaContainer>
  );
};
