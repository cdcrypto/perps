import { Text } from "@components/Text";
import Skeleton from "@mui/material/Skeleton";
import { FundingPeriod } from "@types";
import { convertNumberToString } from "@utils/general";
import { Decimal, Exchange } from "@zetamarkets/sdk";
import { assetToIndex } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useZetaStore } from "stores";


interface FundingRateProps {
  asset: Asset;
  fundingPeriod: FundingPeriod;
}

const fundingPeriodToPrecision = {
  [FundingPeriod.Hourly]: {
    minDecimals: 2,
    maxDecimals: 5,
  },
  [FundingPeriod.Daily]: {
    minDecimals: 2,
    maxDecimals: 2,
  },
  [FundingPeriod.Annually]: {
    minDecimals: 2,
    maxDecimals: 2,
  },
};

const skeletonStyle = { backgroundColor: "#808285" }; // Didn't see in theme

export const convertDailyFundingRate = (
  dailyFundingRate: number,
  fundingPeriod: FundingPeriod
) => {
  switch (fundingPeriod) {
    case FundingPeriod.Annually:
      return dailyFundingRate * 365;
    case FundingPeriod.Daily:
      return dailyFundingRate;
    case FundingPeriod.Hourly:
      return dailyFundingRate / 24;
  }
};

export const formatFundingRate = (
  dailyFundingRate: number,
  fundingPeriod: FundingPeriod
) => {
  if (dailyFundingRate === 0) {
    return "0%";
  }

  const prefix = dailyFundingRate >= 0 ? "+" : "-";
  const { minDecimals, maxDecimals } = fundingPeriodToPrecision[fundingPeriod];
  const periodFundingRate = convertDailyFundingRate(
    dailyFundingRate,
    fundingPeriod
  );
  const fundingRatePctStr = convertNumberToString(
    periodFundingRate * 100,
    minDecimals,
    maxDecimals
  );

  return `${prefix}${fundingRatePctStr}%`;
};

export const getFundingRateColor = (dailyFundingRate: number) => {
  if (dailyFundingRate === 0) {
    return "primary";
  }
  if (dailyFundingRate > 0) {
    return "long";
  }
  return "short";
};

// TODO: rework to hook
export const getDailyFundingRate = (asset: Asset) => {
  return Decimal.fromAnchorDecimal(
    Exchange.pricing.latestFundingRates[assetToIndex(asset)]
  ).toNumber();
};

export const FundingRate = ({ asset, fundingPeriod }: FundingRateProps) => {
  const isInitialized = useZetaStore((s) => s.isInitialized);

  if (!isInitialized) {
    return <Skeleton height="14px" width="60px" style={skeletonStyle} />;
  }

  const dailyFundingRate = getDailyFundingRate(asset);

  const fundingStr = formatFundingRate(dailyFundingRate, fundingPeriod);
  const color = getFundingRateColor(dailyFundingRate);

  return (
    <Text variant="body2" color={color}>
      {fundingStr}
    </Text>
  );
};
