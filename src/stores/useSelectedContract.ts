import { Market } from "@zetamarkets/sdk";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Side, Level } from "@zetamarkets/sdk/dist/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// We have created a synthetic FE order type for market orders, as it is
// not readily available on the BE as of yet
export enum SyntheticOrderType {
  LIMIT = 0,
  POSTONLY,
  FILLORKILL,
  IMMEDIATEORCANCEL,
  POSTONLYSLIDE,
  MARKET,
}

export const useSelectedContractStore = create<SelectedContractStore>()(
  devtools((set) => ({
    setMarket: (market) => set({ market }),

    setSide: (side) => set({ side }),
    side: Side.BID,

    quotePrice: 0,
    setQuotePrice: (quotePrice) => set({ quotePrice }),

    quoteSize: 0,
    setQuoteSize: (quoteSize) => set({ quoteSize }),

    setQuoteInput: (level: Level) =>
      set({ quotePrice: level.price, quoteSize: level.size }),

    orderType: SyntheticOrderType.MARKET,
    setOrderType: (type) => set({ orderType: type }),

    asset: Asset.SOL,
    setAsset: (asset) => set({ asset }),

    reduceOnly: false,
    setReduceOnly: (reduceOnly) => set({ reduceOnly }),

    set: set,
  }))
);

type SelectedContractStore = {
  market?: Market;
  setMarket: (market: Market) => void;

  side: Side;
  setSide: (side: Side) => void;

  quotePrice: number;
  setQuotePrice: (quotePrice: number) => void;

  quoteSize: number;
  setQuoteSize: (quoteSize: number) => void;

  setQuoteInput: (level: Level) => void;

  orderType: SyntheticOrderType;
  setOrderType: (type: SyntheticOrderType) => void;

  asset: Asset;
  setAsset: (asset: Asset) => void;

  reduceOnly: boolean;
  setReduceOnly: (reduceOnly: boolean) => void;
};
