import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef } from "react";
import { useUsdcWalletBalance } from "@hooks/api/useUsdcWalletBalance";
import { useSolWalletBalance } from "@hooks/api/useSolWalletBalance";
import { analytics } from "analytics";

export const useAmplitudeUserSetup = () => {
  const { publicKey, wallet, wallets } = useWallet();
  const { balance: usdcWalletBalance } = useUsdcWalletBalance();
  const { balance: solWalletBalance } = useSolWalletBalance();

  const installedWallets = wallets
    .filter((wallet) => wallet.readyState === WalletReadyState.Installed)
    .map((w) => w.adapter.name);

  // Flags to avoid triggering multiple identify calls
  const hasTrackedRef = useRef<{ wallets: boolean; user: boolean }>({
    wallets: false,
    user: false,
  });

  useEffect(() => {
    if (!hasTrackedRef.current.wallets) {
      analytics.identify(installedWallets, undefined);

      hasTrackedRef.current.wallets = true;
    }
  }, [installedWallets]);

  useEffect(() => {
    // We need for the user to have connected and
    // the balances to have been resolved before identifying
    if (
      !publicKey ||
      usdcWalletBalance === undefined ||
      solWalletBalance === undefined ||
      hasTrackedRef.current.user
    )
      return;

    const publicKeyStr = publicKey.toString();
    analytics.identify(installedWallets, publicKeyStr);

    analytics.connectWallet(
      publicKeyStr,
      solWalletBalance,
      usdcWalletBalance || 0,
      wallet?.adapter.name || ""
    );

    hasTrackedRef.current.user = true;
  }, [
    usdcWalletBalance,
    solWalletBalance,
    publicKey,
    installedWallets,
    wallet?.adapter.name,
  ]);

  useEffect(() => {
    if (!publicKey) {
      // Only need to reset user, we can assume wallets intsalled will remain static
      hasTrackedRef.current.user = false;
    }
  }, [publicKey]);
};
