import { API, GraphQLResult } from "@aws-amplify/api";
import { Trade } from "@types";
import { allAssets, indexToAsset } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import * as queries from "@graphql/queries";
import {
  QueryTradeByAssetBlockTimeIndexQuery,
  QueryTradeByAssetBlockTimeIndexQueryVariables,
} from "API";
import { Side } from "@zetamarkets/sdk/dist/types";
import { useQuery } from "@tanstack/react-query";
import { MS_IN_SECOND } from "@utils/datetime";

export const recentTradesInitialValue = allAssets().reduce(
  (a: Partial<Record<Asset, Trade[]>>, v: Asset) => ({ ...a, [v]: [] }),
  {}
) as Record<Asset, Trade[]>;

export const fetchRecentTrades = async () => {
  const newRecentTrades: Record<Asset, Trade[]> = recentTradesInitialValue;

  const promises = allAssets().map((asset) => {
    const variables: QueryTradeByAssetBlockTimeIndexQueryVariables = {
      asset: asset,
      first: 100,
    };

    return API.graphql({
      query: queries.queryTradeByAssetBlockTimeIndex,
      variables,
    }) as GraphQLResult<QueryTradeByAssetBlockTimeIndexQuery>;
  });

  try {
    const stats = await Promise.all(promises);
    stats.forEach((resp, idx) => {
      const asset = indexToAsset(idx);
      if (resp.data) {
        const items = resp.data.queryTradeByAssetBlockTimeIndex?.items;
        const assetRecentTrades: Trade[] = (items || [])
          .filter((item) => {
            return item?.isTaker;
          })
          .map((item) => {
            return {
              asset: asset,
              timestamp: (item?.blockTime || 0) * MS_IN_SECOND,
              side: item?.isBid ? Side.BID : Side.ASK,
              size: item?.amount || 0,
              price: item?.price || 0,
            };
          });
        newRecentTrades[asset] = assetRecentTrades;
      } else {
        console.error(`No recent trades data found for ${asset}.`);
      }
    });
  } catch (err) {
    console.error("Failed to query recent trades:", err);
  }

  return newRecentTrades;
};

export const useRecentTrades = () => {
  const { data } = useQuery({
    queryKey: ["recent-trades"],
    queryFn: fetchRecentTrades,
    // staleTime: Infinity,
  });

  return data;
};
