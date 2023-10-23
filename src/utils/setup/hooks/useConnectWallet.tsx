import { useCallback } from "react";
import { useZetaWalletModalStore, useLocalStore } from "stores";
import { shallow } from "zustand/shallow";

export const useConnectWallet = () => {
  const termsConditionsTimestamp = useLocalStore(
    (s) => s.termsConditionsTimestamp
  );

  const { setIsWalletModalOpen, setIsTCModalOpen } = useZetaWalletModalStore(
    (s) => ({
      setIsWalletModalOpen: s.setIsWalletModalOpen,
      setIsTCModalOpen: s.setIsTCModalOpen,
    }),
    shallow
  );

  const connectWallet = useCallback(() => {
    termsConditionsTimestamp !== null
      ? setIsWalletModalOpen(true)
      : setIsTCModalOpen(true);
  }, [setIsTCModalOpen, setIsWalletModalOpen, termsConditionsTimestamp]);

  return connectWallet;
};
