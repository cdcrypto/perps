import { useQuery } from "@tanstack/react-query";
import { ZetaApiRequests, zetaServerApi } from "@utils/api";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset, PERP_INDEX } from "@zetamarkets/sdk/dist/constants";

type MarketIndex = number;
export type MarketMetricsResponse = {
  openInterest: Record<Asset, Record<MarketIndex, number>>;
};

const fetchMarketMetrics = async () => {
  /**
   * TODO: Purely just open interest atm - may look to add volume etc. and will have to change structure
   */
  const resp = await zetaServerApi.get<MarketMetricsResponse>(
    `/${ZetaApiRequests.OpenInterest}`
  );
  const openInterest = resp.data.openInterest;
  const formatted = allAssets().reduce(
    (acc, val) => ({
      ...acc,
      [val]: 0,
    }),
    {}
  ) as Record<Asset, number>;

  for (const [asset, marketMap] of Object.entries(openInterest)) {
    formatted[asset as Asset] = marketMap[PERP_INDEX];
  }

  return formatted;
};

export const useOpenInterest = () => {
  const { data } = useQuery({
    queryKey: ["open-interest"],
    queryFn: fetchMarketMetrics,
    refetchInterval: 30000,
  });

  return { ...data };
};
