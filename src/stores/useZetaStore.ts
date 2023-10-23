import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const pricesInitialValue = allAssets().reduce(
  (a: Partial<Record<Asset, number>>, v: Asset) => ({ ...a, [v]: 0 }),
  {}
) as Record<Asset, number>;

type ZetaStore = {
  isInitialized: boolean;
  setIsInitialized: (val: boolean) => void;

  prices: Record<Asset, number>;
  setPrice: (asset: Asset, price: number) => void;

  clearStore: () => void;
};

export const useZetaStore = create<ZetaStore>()(
  devtools(
    (set) => ({
      clearStore: () =>
        set({ isInitialized: false, prices: pricesInitialValue }),

      isInitialized: false,
      setIsInitialized: (val: boolean) => set({ isInitialized: val }),

      prices: pricesInitialValue,
      setPrice: (asset, price) => {
        set((state) => ({ prices: { ...state.prices, [asset]: price } }));
      },
    }),
    { name: "zeta-store" }
  )
);
