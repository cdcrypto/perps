import { useConnection } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const useSolanaTps = () => {
  const { connection } = useConnection();

  const fetchAverageTps = useCallback(async () => {
    const recentPerformanceSamples =
      await connection.getRecentPerformanceSamples(1);
    if (recentPerformanceSamples.length === 0) {
      return 0;
    }

    const averageTps = Math.floor(
      recentPerformanceSamples[0].numTransactions /
        recentPerformanceSamples[0].samplePeriodSecs
    );

    if (isNaN(averageTps)) {
      return 0;
    }

    return averageTps;
  }, [connection]);

  const { data } = useQuery({
    queryKey: ["solana-tps"],
    queryFn: fetchAverageTps,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  return data;
};
