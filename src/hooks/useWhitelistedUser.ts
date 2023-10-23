import { useClient } from "@hooks/client/useClient";
import { useWallet } from "@solana/wallet-adapter-react";
import { Exchange, utils } from "@zetamarkets/sdk";
import { useEffect } from "react";
import { useClientStore, useZetaStore } from "stores";

export const useWhitelistedUser = () => {
  const isInitialized = useZetaStore((s) => s.isInitialized);
  const setWhitelistedUser = useClientStore((s) => s.setWhitelistedUser);
  const client = useClient();
  const { publicKey } = useWallet();
  /**
   * Check if the user is whitelisted/market maker
   */
  useEffect(() => {
    if (!isInitialized || !client || !publicKey) return;
    const [whitelistTradingFeesAddress] =
      utils.getUserWhitelistTradingFeesAccount(Exchange.programId, publicKey);
    Exchange.program.account.whitelistTradingFeesAccount
      .fetch(whitelistTradingFeesAddress)
      .then(() => {
        // If no error whitelist acc exists
        setWhitelistedUser(true);
      })
      .catch(() => {
        // silently catch error
      });
  }, [client, isInitialized, publicKey, setWhitelistedUser]);
};
