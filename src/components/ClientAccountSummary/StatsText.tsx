import { Text } from "@components/Text";
import { TextColor, TextProps } from "@components/Text/Text";
import {
  convertDollarNumberToString,
  convertNumberToString,
} from "@utils/general";
import Skeleton from "@mui/material/Skeleton";
import { useWallet } from "@solana/wallet-adapter-react";
import { SummarySkeletonWrapper } from "./styles";
import { AccountMetric } from "@types";
interface StatsTextProps {
  variant: "percentage" | "dollar" | "leverage";
  textVariant?: Pick<TextProps, "variant">["variant"];
  color?: TextColor;
  statValue: AccountMetric;
  isBold?: boolean;
}
export const StatsText = ({
  variant,
  textVariant = "caption",
  color = "primary",
  statValue,
  isBold,
}: StatsTextProps) => {
  const TWO_DP = 2;
  const { connected } = useWallet();

  if (statValue !== undefined) {
    statValue ||= 0;

    switch (variant) {
      case "percentage":
        return (
          <Text variant={textVariant} color={color} bold={isBold}>
            {` ${convertNumberToString(statValue, undefined, TWO_DP)} %`}
          </Text>
        );
      case "dollar":
        return (
          <Text variant={textVariant} color={color} bold={isBold}>
            {`${convertDollarNumberToString(statValue, undefined, TWO_DP)}`}
          </Text>
        );
      case "leverage":
        return (
          <Text variant={textVariant} color={color} bold={isBold}>
            {` ${convertNumberToString(statValue, undefined, TWO_DP)} x`}
          </Text>
        );
    }
  } else if (!connected) {
    return (
      <Text variant={textVariant} color={color}>
        n/a
      </Text>
    );
  } else {
    return (
      <SummarySkeletonWrapper>
        <Skeleton height={20} width="35%" />
      </SummarySkeletonWrapper>
    );
  }
};
