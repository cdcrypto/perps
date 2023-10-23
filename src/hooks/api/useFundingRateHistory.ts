import { useQuery } from "@tanstack/react-query";
import {
  MINUTES_IN_ONE_HOUR,
  MS_IN_ONE_MINUTE,
  MS_IN_SECOND,
  SECONDS_IN_FIVE_DAYS,
} from "@utils/datetime";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import axios from "axios";

const BASE_URL = "https://dex-funding-rate-mainnet.zeta.markets/tv/history";

export interface FundingRateHistoryResponse {
  time: number;
  value: string;
}

export const fetchFundingRateHistory = async (asset: Asset) => {
  const currentTimeInSeconds = Date.now() / 1000;
  const previousDayInSeconds = currentTimeInSeconds - SECONDS_IN_FIVE_DAYS;

  const params = {
    symbol: `${asset}-PERP-FUNDING`,
    resolution: MINUTES_IN_ONE_HOUR,
    type: "line-lw",
    from: previousDayInSeconds,
    to: currentTimeInSeconds,
  };

  const { data } = await axios.get<FundingRateHistoryResponse[]>(BASE_URL, {
    params,
  });

  const formattedData = data.map((tuple) => ({
    time: tuple.time * MS_IN_SECOND,
    value: parseFloat(tuple.value),
  }));

  return formattedData;
};

export const useDailyFundingRateHistory = (asset: Asset) => {
  const { data } = useQuery({
    queryKey: ["funding-rate-history", asset],
    queryFn: () => fetchFundingRateHistory(asset),
    staleTime: MS_IN_ONE_MINUTE,
    keepPreviousData: true,
  });

  return data ?? [];
};
