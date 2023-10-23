import { useQuery } from "@tanstack/react-query";
import { MS_IN_SECOND, SECONDS_IN_DAY } from "@utils/datetime";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import axios from "axios";
import { useMemo } from "react";
import { useZetaStore } from "stores";

interface PythBenchmark {
  publishTime: string;
  symbol: string;
  price: number;
  confidence: number;
}

type PythBenchmarkResponse = PythBenchmark[] | { error: string };

/**
 *
 * @param timestamp unix timestamp in seconds
 * @returns `PythBenchmarkResponse`
 */
const fetchHistoricalPrice = async (timestamp: number) => {
  const resp = await axios.get<PythBenchmarkResponse>(
    "https://pyth-benchmark-api-proxy.zetaplatform.workers.dev",
    {
      withCredentials: false,
      params: { timestamp: Math.floor(timestamp) },
    }
  );

  return resp.data;
};

export const useDayDelta = (asset: Asset) => {
  const currPrice = useZetaStore((s) => s.prices[asset]);
  const { data } = useQuery({
    queryKey: ["historical-prices-day"],
    queryFn: () =>
      fetchHistoricalPrice(Date.now() / MS_IN_SECOND - SECONDS_IN_DAY),
    refetchInterval: 60_000,
    staleTime: 60_000,
  });

  const pricePrevDay = useMemo(() => {
    if (!data || !Array.isArray(data)) return;
    const filteredAsset = data.find(
      (benchmark) => benchmark.symbol === `Crypto.${asset}/USD`
    );

    if (!filteredAsset) {
      return console.error(
        "Asset not found in historical prices, asset: ",
        asset
      );
    }

    return filteredAsset?.price;
  }, [asset, data]);

  const deltas = useMemo(() => {
    if (!pricePrevDay) return;
    const nominal = currPrice - pricePrevDay;
    const percentage = (nominal / pricePrevDay) * 100;

    return { currPrice, pricePrevDay, nominal, percentage };
  }, [currPrice, pricePrevDay]);

  return deltas;
};
