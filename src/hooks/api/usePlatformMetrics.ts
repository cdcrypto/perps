import { useQuery } from "@tanstack/react-query";
import { ZetaApiRequests, zetaDataApi, zetaServerApi } from "@utils/api";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useZetaStore } from "stores";

export type PlatformMetrics = {
  totalNotionalVolume24H?: number;
  totalNotionalOI?: number;
  totalTrades?: number;
};

type PlatformStatsResponse = {
  volume_24h: number | null;
  trade_count_24h: number | null;
  timestamp: number;
  total_open_interest: number | null;
  tvl: number | null;
  tvl_timestamp: number;
};
type OIResopnse = {
  slot: number;
  totalOpenInterest: Record<Asset, number>;
};

const fetchTotalOpenInterest = async () => {
  const resp = await zetaServerApi.get<OIResopnse>(
    `/${ZetaApiRequests.TotalOpenInterest}`
  );
  const totalNotionalOI = allAssets().reduce((totalOI, asset) => {
    const assetOI =
      resp.data.totalOpenInterest[asset] *
      useZetaStore.getState().prices[asset];
    totalOI += assetOI;
    return totalOI;
  }, 0);

  return totalNotionalOI;
};

const fetchPlatformMetrics = async () => {
  const globalStats = await zetaDataApi.get<PlatformStatsResponse>(
    `/${ZetaApiRequests.PlatformMetrics}`
  );
  const totalNotionalVolume24H = globalStats.data.volume_24h || 0;
  const totalTrades = globalStats.data.trade_count_24h || 0;

  return { totalNotionalVolume24H, totalTrades };
};

export const usePlatformMetrics = (): PlatformMetrics => {
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const { data: totalNotionalOI } = useQuery({
    queryKey: ["total-open-interest"],
    queryFn: fetchTotalOpenInterest,
    enabled: isInitialized,
    refetchInterval: 60_000,
  });

  const { data: platformMetrics } = useQuery({
    queryKey: ["platform-metrics"],
    queryFn: fetchPlatformMetrics,
    refetchInterval: 60_000,
  });

  return { totalNotionalOI, ...platformMetrics };
};
