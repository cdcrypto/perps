import { WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export const useDisconnectOnWalletKeyChange = (wallet: WalletContextState) => {
  const [previousPk, setPreviousPk] = useState<string | undefined>();
  const currentPk = wallet.publicKey?.toBase58();

  useEffect(() => {
    const handleChange = async () => {
      if (previousPk && currentPk && previousPk !== currentPk) {
        await wallet.disconnect();
      }
      setPreviousPk(currentPk);
    };

    void handleChange();
  }, [previousPk, currentPk, wallet]);
};
