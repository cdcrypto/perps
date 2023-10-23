import { useQuery } from "@tanstack/react-query";
import { zetaDataApi } from "@utils/api";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { MS_IN_SECOND } from "@utils/datetime";

type FundingHistoryResponse = {
  asset: Asset;
  balance_change: number;
  margin_account: string;
  timestamp: number;
};

export type FundingEvent = {
  timestamp: number;
  balanceChange: number;
  asset: Asset;
};

export const ASSETS_BY_STRING: Record<string, Asset> = {
  [Asset.SOL]: Asset.SOL,
  [Asset.APT]: Asset.APT,
  [Asset.BTC]: Asset.BTC,
  [Asset.ARB]: Asset.ARB,
  [Asset.ETH]: Asset.ETH,
};

export const fetchFundingHistory = async (publicKey?: string) => {
  if (!publicKey) return undefined;

  const resp = await zetaDataApi.get<FundingHistoryResponse[]>(
    `/account/${publicKey}/funding?limit=100`
  );
  const fundingHistory = resp.data
    .map((fundingEvent: FundingHistoryResponse) => {
      return {
        timestamp: fundingEvent.timestamp * MS_IN_SECOND,
        asset: ASSETS_BY_STRING[fundingEvent.asset] ?? Asset.UNDEFINED,
        balanceChange: fundingEvent.balance_change,
      };
    })
    .sort((a: FundingEvent, b: FundingEvent) => {
      return b.timestamp - a.timestamp;
    })
    .filter((funding: FundingEvent) => funding.balanceChange);

  return fundingHistory;
};

export const useFundingHistory = (publicKey?: string) => {
  const { data } = useQuery({
    queryKey: ["funding-history", publicKey],
    queryFn: () => fetchFundingHistory(publicKey),
    staleTime: 1000 * 60 * 5,
    enabled: !!publicKey,
  });

  return data;
};
