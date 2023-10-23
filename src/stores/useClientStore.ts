import { Migration } from "@types";
import { CrossClient } from "@zetamarkets/sdk";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { Order, Position, TriggerOrder } from "@zetamarkets/sdk/dist/types";
import { ClientTransactions } from "client/Client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ClientStore = {
  client?: CrossClient | undefined;
  setClient: (val?: CrossClient) => void;

  migration: Migration | undefined;
  setMigration: (val?: Migration) => void;

  transactions?: ClientTransactions | undefined;
  setTransactions: (val?: ClientTransactions) => void;

  whitelistedUser: boolean;
  setWhitelistedUser: (val: boolean) => void;

  ampliIdentified: boolean;
  setAmpliIdentified: (val: boolean) => void;

  delegator?: string;
  setDelegator: (val?: string) => void;

  positions: Record<Asset, Position | undefined>;
  updatePositions: () => void;

  orders: Record<Asset, Order[]>;
  updateOrders: () => Promise<void>;

  triggerOrders: Record<Asset, TriggerOrder[]>;
  updateTriggerOrders: () => void;

  clearStore: () => void;
};
const positionsInitialValue = allAssets().reduce(
  (a: Partial<ClientStore["positions"]>, v: Asset) => ({
    ...a,
    [v]: undefined,
  }),
  {}
) as ClientStore["positions"];

export const ordersInitialValue = allAssets().reduce(
  (a: Partial<ClientStore["orders"]>, v: Asset) => ({
    ...a,
    [v]: [],
  }),
  {}
) as ClientStore["orders"];

export const triggerOrdersInitialValue = allAssets().reduce(
  (a: Partial<ClientStore["triggerOrders"]>, v: Asset) => ({
    ...a,
    [v]: [],
  }),
  {}
) as ClientStore["triggerOrders"];

export const useClientStore = create<ClientStore>()(
  devtools(
    (set, get) => ({
      client: undefined,
      setClient: (val) => set({ client: val }),

      migration: undefined,
      setMigration: (val) => set({ migration: val }),

      transactions: undefined,
      setTransactions: (val) => set({ transactions: val }),

      whitelistedUser: false,
      setWhitelistedUser: (val) => set({ whitelistedUser: val }),

      ampliIdentified: false,
      setAmpliIdentified: (val) => set({ ampliIdentified: val }),

      delegator: undefined,
      setDelegator: (val) => set({ delegator: val }),

      positions: positionsInitialValue,
      updatePositions: () => {
        const client = get().client;
        if (!client) return;

        const positions = allAssets().reduce(
          (accum: ClientStore["positions"], asset: Asset) => {
            // TODO: we can now just use client.positions
            const assetPositions = client.getPositions(asset);
            if (assetPositions.length) {
              // We use index 0 here because a user can only have a singular perp position within their
              // total positions in a margin account
              accum[asset] = assetPositions[0];
            }
            return accum;
          },
          { ...positionsInitialValue }
        );

        set({
          positions,
        });
      },

      orders: ordersInitialValue,
      updateOrders: async () => {
        const client = get().client;
        if (!client) return;

        await client.updateOrders();

        const orders: Record<Asset, Order[]> = allAssets().reduce(
          (accum: ClientStore["orders"], asset: Asset) => {
            accum[asset] = client.getOrders(asset).map((order: Order) => {
              return { ...order, asset };
            });
            return accum;
          },
          { ...ordersInitialValue }
        );

        set({ orders });
      },

      triggerOrders: triggerOrdersInitialValue,
      updateTriggerOrders: () => {
        const client = get().client;
        if (!client) return;

        const triggerOrders: Record<Asset, TriggerOrder[]> = allAssets().reduce(
          (accum: ClientStore["triggerOrders"], asset: Asset) => {
            accum[asset] = (client.getTriggerOrders(asset) ?? []).map(
              (order: TriggerOrder) => {
                return { ...order, asset };
              }
            );
            return accum;
          },
          { ...triggerOrdersInitialValue }
        );

        set({ triggerOrders });
      },

      clearStore: () => {
        void get().client?.close();
        set({
          client: undefined,
          transactions: undefined,
          whitelistedUser: false,
          ampliIdentified: false,
          delegator: undefined,
          positions: positionsInitialValue,
          orders: ordersInitialValue,
          triggerOrders: triggerOrdersInitialValue,
        });
      },
    }),
    { name: "client-store" }
  )
);
