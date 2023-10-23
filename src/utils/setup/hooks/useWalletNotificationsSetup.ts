import { notifications } from "@components/Notification";
import { useWallet } from "@solana/wallet-adapter-react";
import { trimeWalletAddress } from "@utils/general";
import { useEffect, useRef } from "react";

export const useWalletNotificationsSetup = () => {
  const { connected, disconnecting, wallet } = useWallet();

  const lastWalletName = useRef(wallet?.adapter.name);

  const walletAddress = wallet?.adapter.publicKey?.toString();
  const lastWalletAddress = useRef(walletAddress);

  if (lastWalletName.current !== wallet?.adapter.name && wallet?.adapter.name) {
    lastWalletName.current = wallet?.adapter.name;
  }
  if (lastWalletAddress.current !== walletAddress) {
    lastWalletAddress.current = walletAddress;
  }

  useEffect(() => {
    const handleOnConnected = () => {
      if (connected) {
        const shortenedPubkey = lastWalletAddress.current ? trimeWalletAddress(lastWalletAddress.current) : "";
        ;
        notifications.notify({
          variant: "success",
          header: "Wallet Connected",
          body: `Connected to wallet ${shortenedPubkey}`,
        });
      }
    };
    const timeout = setTimeout(handleOnConnected, 100);
    return () => clearTimeout(timeout);
  }, [connected]);


  useEffect(() => {
    if (disconnecting) {
      notifications.notify({
        variant: "info",
        header: "Wallet Disconnected",
        body: `Disconnected from your ${lastWalletName.current ?? ""} wallet`,
      });
    }
  }, [disconnecting]);
};
