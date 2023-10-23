import { Text } from "@components/Text";
import Skeleton from "@mui/material/Skeleton";
import {
  HeadlinebarContainer,
  StatsSummary,
  IndivStat,
  StyledCaption,
  SolanaSpeedContainer,
} from "./styles";
import { useMemo } from "react";
import { convertDollarNumberToString } from "@utils/general";
import { useSolanaTps } from "@hooks/useSolanaTps";
import { usePlatformMetrics } from "@hooks/api/usePlatformMetrics";

export const Headlinebar = () => {
  const solanaTps = useSolanaTps();
  const { totalNotionalVolume24H, totalNotionalOI } = usePlatformMetrics();
  const formattedTotalNotionalVolume24H = useMemo(() => {
    return convertDollarNumberToString(totalNotionalVolume24H, undefined, 2);
  }, [totalNotionalVolume24H]);

  const formattedTotalNotionalOI = useMemo(() => {
    return convertDollarNumberToString(totalNotionalOI, undefined, 2);
  }, [totalNotionalOI]);

  return (
    <HeadlinebarContainer>
      <StatsSummary>
        <IndivStat>
          <Text variant="caption" color="secondary">
            Total Notional Volume (24h)
          </Text>
          {formattedTotalNotionalVolume24H === undefined ? (
            <Skeleton />
          ) : (
            <StyledCaption $bold>
              {formattedTotalNotionalVolume24H ?? 0}
            </StyledCaption>
          )}
        </IndivStat>
        <IndivStat>
          <Text variant="caption" color="secondary">
            Total Notional Open Interest
          </Text>
          {formattedTotalNotionalOI === undefined ? (
            <Skeleton />
          ) : (
            <StyledCaption $bold>{formattedTotalNotionalOI ?? 0}</StyledCaption>
          )}
        </IndivStat>
      </StatsSummary>
      <SolanaSpeedContainer>
        <Text variant="caption" color="secondary">
          Solana Network:
        </Text>
        <StyledCaption $bold>
          {solanaTps === undefined ? <Skeleton /> : solanaTps} TPS
        </StyledCaption>
      </SolanaSpeedContainer>
    </HeadlinebarContainer>
  );
};
