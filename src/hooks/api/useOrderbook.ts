import { useQuery } from "@tanstack/react-query";
import { ZetaApiRequests, zetaServerApi } from "@utils/api";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset, PERP_INDEX } from "@zetamarkets/sdk/dist/constants";
import { DepthOrderbook } from "@zetamarkets/sdk/dist/types";
import { Exchange } from "@zetamarkets/sdk";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type OrderbooksResponse = Record<Asset, DepthOrderbook[]>;
export type Orderbooks = Record<Asset, DepthOrderbook>;

const fetchWebserverOrderbook = async () => {
  const resp = await zetaServerApi.get<{
    slot: number;
    orderbooks: OrderbooksResponse;
  }>(`/${ZetaApiRequests.Orderbook}`, {
    params: { marketIndexes: [PERP_INDEX] },
  });

  const formattedOrderbooks = allAssets().reduce(
    (a: Partial<Orderbooks>, v: Asset) => ({
      ...a,
      [v]: resp.data.orderbooks[v][0],
    }),
    {}
  ) as Orderbooks;

  return formattedOrderbooks;
};

export const useWebserverOrderbook = ():
  | Record<Asset, DepthOrderbook>
  | undefined => {
  // Webserver gives all orderbooks, but is slower. Use it to plug the gap when switching assets or closing positions
  const { data } = useQuery({
    queryKey: ["orderbook"],
    queryFn: fetchWebserverOrderbook,
    refetchInterval: 5000,
  });
  return data;
};

const ORDERBOOK_UPDATE_MS = 300;

export const useOrderbook = (asset: Asset): DepthOrderbook | undefined => {
  const [data, setData] = useState<DepthOrderbook>();

  useEffect(() => {
    let timerId = setTimeout(function updateOrderBook() {
      // SDK subscribes to the current orderbook
      if (!Exchange.isInitialized) {
        setData(undefined);
        timerId = setTimeout(updateOrderBook, ORDERBOOK_UPDATE_MS);
        return;
      }

      const orderbook = { ...Exchange.getOrderbook(asset) };
      if (
        Object.keys(orderbook).length === 0 ||
        (orderbook.asks.length === 0 && orderbook.bids.length === 0)
      ) {
        setData(undefined);
      } else {
        // flushSync to ensure that all orderbook updates results in a re-render, thus reducing the occurrence of drifting.
        // Drifting refers to the case where the orderbook scrolls away from the set center, and that is caused by
        // the unpredictable rate in which DOM repaints happen that cause undefined scroll behavior.
        // Nevertheless, this does not 100% guarantee that drifting will not occur as in the ideal case,
        // we would want to only setData after a DOM repaint triggered by a previous setData has already
        // happened. There is no way to detect if a DOM repaint has already happened, so this is the best we can do.
        flushSync(() => {
          setData(orderbook);
        });
      }

      timerId = setTimeout(updateOrderBook, ORDERBOOK_UPDATE_MS);
    }, ORDERBOOK_UPDATE_MS);

    return () => {
      clearTimeout(timerId);
    };
  }, [asset]);

  return data;
};
