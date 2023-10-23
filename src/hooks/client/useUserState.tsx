import { useWallet } from "@solana/wallet-adapter-react";
import { useClientStore } from "stores";

/**
 * Enum representing the user's state with respect to wallet connection status
 * and initialization of the `@zetamarkets/sdk`.
 */
export enum UserState {
  /**
   * The state when the user's wallet is disconnected.
   */
  DISCONNECTED = "Disconnected",

  /**
   * The user's wallet has connected but the client hasn't loaded yet.
   */
  CONNECTED_AND_LOADING = "ConnectedAndLoading",

  /**
   * The state when the user has connected and they have a valid margin account.
   */
  CONNECTED_WITH_MARGIN_ACCOUNT = "ConnectedWithMarginAccount",

  /**
   * The state when the user has connected but they don't have a valid margin account.
   */
  CONNECTED_WITHOUT_MARGIN_ACCOUNT = "ConnectedWithoutMarginAccount",
}

/**
 * @returns    The user's state as defined by the UserState enum.
 */
export const useUserState = () => {
  const { connected } = useWallet();
  const { client } = useClientStore((s) => ({
    client: s.client,
  }));
  const marginAccountExists = !!client?.account;

  if (!connected) {
    return UserState.DISCONNECTED;
  } else if (!client) {
    return UserState.CONNECTED_AND_LOADING;
  } else if (marginAccountExists) {
    return UserState.CONNECTED_WITH_MARGIN_ACCOUNT;
  } else {
    return UserState.CONNECTED_WITHOUT_MARGIN_ACCOUNT;
  }
};
