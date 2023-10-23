import { API, GraphQLSubscription, graphqlOperation } from "@aws-amplify/api";
import { onCreateTrade } from "@graphql/subscriptions";
import {
  fetchRecentTrades,
  recentTradesInitialValue,
} from "@hooks/api/useRecentTrades";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Trade } from "@types";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side } from "@zetamarkets/sdk/dist/types";
import {
  OnCreateTradeSubscription,
  OnCreateTradeSubscriptionVariables,
} from "API";
import { useEffect } from "react";
import { MS_IN_SECOND } from "../../datetime";

// Global variable to ensure only one subscription is active
let sub: ReturnType<typeof subscribeRecentTrades> | undefined = undefined;

export const subscribeRecentTrades = (
  cb: (asset: Asset, trade: Trade) => void
) => {
  const recentTradesSubscriptionVars: OnCreateTradeSubscriptionVariables = {
    isTaker: true,
  };

  const sub = API.graphql<GraphQLSubscription<OnCreateTradeSubscription>>(
    graphqlOperation(onCreateTrade, recentTradesSubscriptionVars)
  ).subscribe({
    next: ({ value }) => {
      const newTradeData = value.data?.onCreateTrade;
      const newRecentTrade: Trade = {
        asset: (newTradeData?.asset as Asset) || Asset.UNDEFINED,
        timestamp: (newTradeData?.blockTime || 0) * MS_IN_SECOND,
        side: newTradeData?.isBid ? Side.BID : Side.ASK,
        size: newTradeData?.amount || 0,
        price: newTradeData?.price || 0,
        isTaker: true,
      };
      cb((newTradeData?.asset as Asset) || Asset.UNDEFINED, newRecentTrade);
    },
    error: (error) => console.warn(error),
  });

  return sub;
};

const setupRecentTrades = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery(["recent-trades"], fetchRecentTrades, {
    staleTime: Infinity,
  });

  // Exit early if already subscribed
  if (sub) return;

  sub = subscribeRecentTrades((asset, trade) => {
    queryClient.setQueryData(
      ["recent-trades"],
      (recentTrades: Record<Asset, Trade[]> | undefined) => {
        const updatedTrades = { ...(recentTrades || recentTradesInitialValue) };
        updatedTrades[asset] = [trade, ...updatedTrades[asset]];
        return updatedTrades;
      }
    );
  });

  return sub;
};

export const useRecentTradesSetup = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    setupRecentTrades(queryClient).then().catch(console.error);
    return () => sub?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
