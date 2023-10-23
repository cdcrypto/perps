import { WalletName } from "@solana/wallet-adapter-base";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

export const useHandleConnect = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { select, connected, disconnect } = useWallet();
  const [hasChangedWallet, setHasChangedWallet] = useState<WalletName>();

  /**
   * For some reason, debouncing is required when changing wallets
   * disconnect().then -> select() consistently work (disconnects but fails to connect)
   * Setting a flag, then explicity waiting for the connected state to change,
   * then calling select() makes the wallet change work reliably.
   */
  useEffect(() => {
    if (!connected && hasChangedWallet) {
      select(hasChangedWallet);
      setHasChangedWallet(undefined);
    }
  }, [hasChangedWallet, connected, select]);

  const handleConnect = useCallback(
    (wallet: Wallet) => {
      if (connected) {
        disconnect()
          .then(() => {
            setHasChangedWallet(wallet.adapter.name);
          })
          .catch((e) => {
            console.error("Error changing wallet: ", e);
          });
      } else {
        select(wallet.adapter.name);
      }
    },
    [connected, disconnect, select]
  );

  return handleConnect;
};
