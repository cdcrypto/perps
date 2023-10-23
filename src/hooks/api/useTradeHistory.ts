import { API, GraphQLResult } from "@aws-amplify/api";
import {
  queryLiquidationByLiquidateeBlockTimeIndex,
  queryTradeByAuthorityBlockTimeIndex,
} from "@graphql/queries";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import {
  QueryLiquidationByLiquidateeBlockTimeIndexQuery,
  QueryLiquidationByLiquidateeBlockTimeIndexQueryVariables,
  QueryTradeByAuthorityBlockTimeIndexQuery,
  QueryTradeByAuthorityBlockTimeIndexQueryVariables,
} from "API";
import { useMemo } from "react";
import { Trade } from "@types";

export const queryTradeHistory = async (
  publicKey?: string
): Promise<Trade[] | undefined> => {
  if (!publicKey) return undefined;
  const variables: QueryTradeByAuthorityBlockTimeIndexQueryVariables = {
    authority: publicKey,
    first: 1000,
  };

  const resp = (await API.graphql({
    query: queryTradeByAuthorityBlockTimeIndex,
    variables,
  })) as GraphQLResult<QueryTradeByAuthorityBlockTimeIndexQuery>;

  const tradeHistoryItems =
    resp.data?.queryTradeByAuthorityBlockTimeIndex?.items;

  return (tradeHistoryItems || [])?.map((trade) => {
    return {
      timestamp: trade?.blockTime || 0,
      side: trade?.isBid ? Side.BID : Side.ASK,
      isTaker: trade?.isTaker || false,
      size: trade?.amount || 0,
      price: trade?.price || 0,
      asset: trade?.asset as Asset,
      isLiquidation: false,
    };
  });
};

const queryLiquidationHistory = async (
  publicKey?: string
): Promise<Trade[] | undefined> => {
  if (!publicKey) return undefined;
  const variables: QueryLiquidationByLiquidateeBlockTimeIndexQueryVariables = {
    liquidatee: publicKey,
  };

  const resp = (await API.graphql({
    query: queryLiquidationByLiquidateeBlockTimeIndex,
    variables,
  })) as GraphQLResult<QueryLiquidationByLiquidateeBlockTimeIndexQuery>;

  const liquidationHistoryItems =
    resp.data?.queryLiquidationByLiquidateeBlockTimeIndex?.items;

  return (liquidationHistoryItems || [])?.map((liquidation) => {
    return {
      timestamp: liquidation?.blockTime || 0,
      side: liquidation?.isBid ? Side.BID : Side.ASK,
      isTaker: false,
      size: liquidation?.amount || 0,
      price: liquidation?.markPrice || 0,
      asset: liquidation?.asset as Asset,
      isLiquidation: true,
    };
  });
};

export const useTradeHistory = (publicKey?: string) => {
  const { data: tradeData } = useQuery({
    queryKey: ["trade-history", publicKey],
    queryFn: () => queryTradeHistory(publicKey),
    staleTime: Infinity,
    enabled: !!publicKey,
  });

  const { data: liquidationData } = useQuery({
    queryKey: ["liquidation-history", publicKey],
    queryFn: () => queryLiquidationHistory(publicKey),
    staleTime: Infinity,
    enabled: !!publicKey,
  });

  const tradeEventsHistory = useMemo(() => {
    if (!tradeData || !liquidationData) return undefined;
    const concatTradeData = tradeData
      .concat(liquidationData)
      // Sort in descending order
      .sort((a, b) => b.timestamp - a.timestamp);
    return concatTradeData;
  }, [liquidationData, tradeData]);

  return tradeEventsHistory;
};
