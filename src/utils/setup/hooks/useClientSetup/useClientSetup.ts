import { notifications } from "@components/Notification/useNotification";
import { useV2WhitelistedUser } from "@hooks/api/useV2WhitelistedUser";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Client, CrossClient, Wallet, utils } from "@zetamarkets/sdk";
import { allAssets } from "@zetamarkets/sdk/dist/assets";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { EventType } from "@zetamarkets/sdk/dist/events";
import {
  MarginAccount,
  TradeEventV3,
} from "@zetamarkets/sdk/dist/program-types";
import { Order } from "@zetamarkets/sdk/dist/types";
import { SolanaClient } from "client/SolanaClient";
import { useCallback, useEffect, useRef } from "react";
import { useClientStore, useUserSettings, useZetaStore } from "stores";
import { shallow } from "zustand/shallow";
import { useDisconnectOnWalletKeyChange } from "./useDisconnectOnWalletKeyChange";
import { useHandleWalletDisconnect } from "./useHandleWalletDisconnect";
import { WalletConnectWalletName } from "@solana/wallet-adapter-walletconnect";

interface TradeEventWithSlot {
  tradeEvent: TradeEventV3;
  slot: number;
}

export const useClientSetup = (
  handleTradeEvents?: (
    events: TradeEventV3[],
    positions: CrossClient["positions"],
    orders: CrossClient["orders"]
  ) => void
) => {
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const wallet = useWallet();
  const useVersionedTxs = !wallet.wallet
    ? true
    : !!wallet.wallet.adapter?.supportedTransactionVersions?.has(0) &&
      wallet.wallet.adapter.name !== WalletConnectWalletName;

  useHandleWalletDisconnect(wallet.disconnecting);
  useDisconnectOnWalletKeyChange(wallet);

  const { connection } = useConnection();

  const isWhitelisted = useV2WhitelistedUser(wallet.publicKey?.toString());

  const tradeEventsCache = useRef([] as TradeEventWithSlot[]);
  const currentClient = useRef<CrossClient>();

  const {
    client,
    setClient,
    setTransactions,
    updatePositions,
    updateOrders,
    updateTriggerOrders,
    delegator,
    transactions,
  } = useClientStore(
    (state) => ({
      client: state.client,
      setClient: state.setClient,
      setTransactions: state.setTransactions,
      updateOrders: state.updateOrders,
      updateTriggerOrders: state.updateTriggerOrders,
      updatePositions: state.updatePositions,
      delegator: state.delegator,
      transactions: state.transactions,
    }),
    shallow
  );

  const marketOrderSlippage = useUserSettings((s) => s.marketOrderSlippage);
  if (client && client !== currentClient.current) {
    currentClient.current = client;
  }

  const clientCallback = useCallback(
    (_asset: Asset, type: EventType, slot: number, _data: unknown) => {
      switch (type) {
        case EventType.USER: {
          updateOrders()
            .then(() => {
              // trigger orders are only updated in the sdk after orders are updated
              // so we need to update the zustand state after the promise resolves
              updateTriggerOrders();
            })
            .catch(() => {
              // ignore update orders error
            });

          // TODO: Should only need to do it in trade event, test this.
          updatePositions();
          // TODO: update calcs
          const tradeEvents = tradeEventsCache.current
            .filter((event) => event.slot <= slot)
            .map((event) => event.tradeEvent);

          if (
            currentClient.current?.positions &&
            currentClient.current?.orders
          ) {
            handleTradeEvents?.(
              tradeEvents,
              currentClient.current?.positions,
              currentClient.current?.orders
            );
          }
          tradeEventsCache.current = tradeEventsCache.current.filter(
            (event) => event.slot > slot
          );
          break;
        }
        case EventType.TRADEV3: {
          if (!_data) {
            return;
          }

          updateOrders()
            .then(() => {
              updateTriggerOrders();
            })
            .catch(() => {
              // ignore update orders error
            });

          updatePositions();
          tradeEventsCache.current.push({
            slot,
            tradeEvent: _data as TradeEventV3,
          });

          break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    /**
     * client - only need to init client once, return if already exists
     * isInitialized - Exchange needs to be initialised before
     * Wallet - when 'disconnecting', 'connected' will still be true, so explicitly check for both
     * (client is cleared on `disconnecting` and thus client can be undefined whilst wallet is still connected)
     */
    if (client || !isInitialized || !wallet.connected || wallet.disconnecting)
      return;

    if (isWhitelisted === undefined) return;
    if (!isWhitelisted) {
      notifications.notify({
        variant: "error",
        header: "Public key not whitelisted",
        body: "Zeta V2 is in alpha. Only whitelisted public keys are able to use the exchange.",
      });
      void wallet.disconnect();
      return;
    }

    const loadClient = async () => {
      try {
        const defaultOptions = utils.defaultCommitment();
        const xClient = await CrossClient.load(
          connection,
          wallet as unknown as Wallet,
          defaultOptions,
          clientCallback,
          false,
          !delegator ? undefined : new PublicKey(delegator),
          useVersionedTxs
        );
        setClient(xClient);
        const transactions = new SolanaClient(
          xClient,
          notifications,
          marketOrderSlippage / 100
        );
        setTransactions(transactions);
        // Load orders and positions on start up
        clientCallback(Asset.UNDEFINED, EventType.TRADEV3, 0, undefined);
        clientCallback(Asset.UNDEFINED, EventType.USER, 0, undefined);
        if (!xClient.account) {
          const client = await Client.load(
            connection,
            wallet as unknown as Wallet,
            defaultOptions,
            () => {},
            false,
            undefined,
            true
          );

          const marginAccounts = allAssets()
            .map((asset) => client.getMarginAccount(asset))
            .filter((account) => !!account) as MarginAccount[];

          if (marginAccounts.length) {
            const openOrders = allAssets().reduce(
              (acc, asset) => ({ ...acc, [asset]: client.getOrders(asset) }),
              {}
            ) as Record<Asset, Order[]>;

            useClientStore.getState().setMigration({
              migrationRequired: true,
              marginAccounts,
              openOrders: openOrders,
              client: client,
            });
          }
        }
      } catch (e) {
        console.warn("Unable to load client: ", e);
        throw e;
      }
    };

    void loadClient();
    // client is added to account for clearClient() on closing margin account
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    wallet,
    isInitialized,
    client,
    clientCallback,
    delegator,
    setClient,
    setTransactions,
    isWhitelisted,
    connection,
    useVersionedTxs,
  ]);

  useEffect(() => {
    transactions?.setMarketOrderSlippage(marketOrderSlippage / 100);
  }, [transactions, marketOrderSlippage]);
};
