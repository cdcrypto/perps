import { API, GraphQLSubscription, graphqlOperation } from "@aws-amplify/api";
import { onCreateLiquidation, onCreateTrade } from "@graphql/subscriptions";
import { queryTradeHistory } from "@hooks/api/useTradeHistory";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Trade } from "@types";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import {
  OnCreateLiquidationSubscription,
  OnCreateLiquidationSubscriptionVariables,
  OnCreateTradeSubscription,
  OnCreateTradeSubscriptionVariables,
} from "API";
import { useEffect } from "react";

export const subscribeUserTradeHistory = (
  publicKey: string,
  addToTradeHistory: (trade: Trade) => void
) => {
  const tradeHistorySubscriptionVars: OnCreateTradeSubscriptionVariables = {
    authority: publicKey,
  };
  API.graphql<GraphQLSubscription<OnCreateTradeSubscription>>(
    graphqlOperation(onCreateTrade, tradeHistorySubscriptionVars)
  ).subscribe({
    next: ({ value }) => {
      const newTradeData = value.data?.onCreateTrade;
      const newTrade: Trade = {
        asset: (newTradeData?.asset as Asset) || Asset.UNDEFINED,
        timestamp: newTradeData?.blockTime || 0,
        side: newTradeData?.isBid ? Side.BID : Side.ASK,
        size: newTradeData?.amount || 0,
        price: newTradeData?.price || 0,
        isTaker: newTradeData?.isTaker || false,
      };

      addToTradeHistory(newTrade);
    },
    error: (error) => console.warn(error),
  });

  const liquidationSubscriptionVars: OnCreateLiquidationSubscriptionVariables =
    {
      liquidatee: publicKey,
    };
  const sub = API.graphql<GraphQLSubscription<OnCreateLiquidationSubscription>>(
    graphqlOperation(onCreateLiquidation, liquidationSubscriptionVars)
  ).subscribe({
    next: ({ value }) => {
      const newLiquidationData = value.data?.onCreateLiquidation;
      const newLiquidation: Trade = {
        asset: (newLiquidationData?.asset as Asset) || Asset.UNDEFINED,
        timestamp: newLiquidationData?.blockTime || 0,
        side: newLiquidationData?.isBid ? Side.BID : Side.ASK,
        size: newLiquidationData?.amount || 0,
        price: newLiquidationData?.markPrice || 0,
        isLiquidation: true,
      };

      addToTradeHistory(newLiquidation);
    },
    error: (error) => console.warn(error),
  });

  return sub;
};

const setupTradeHistory = async (
  queryClient: QueryClient,
  publicKey?: string
) => {
  if (!publicKey) return;

  await queryClient.prefetchQuery(
    ["trade-history", publicKey],
    () => queryTradeHistory(publicKey),
    {
      staleTime: Infinity,
    }
  );
  const sub = subscribeUserTradeHistory(publicKey, (trade) => {
    // TODO: fix any typing
    queryClient.setQueryData(
      ["trade-history", publicKey],
      (old: Trade[] | undefined) => {
        const newAssetRecentTrades = old ? [trade, ...old] : [trade];
        return newAssetRecentTrades;
      }
    );
  });

  return sub;
};

let init = false;
export const useTradeHistorySetup = (publicKey?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let sub: Awaited<ReturnType<typeof setupTradeHistory>> | undefined;
    if (!publicKey) return;
    if (init) return;

    init = true;
    setupTradeHistory(queryClient, publicKey)
      .then((s) => (sub = s))
      .catch(console.error);
    return () => sub?.unsubscribe();
  }, [publicKey, queryClient]);
};
