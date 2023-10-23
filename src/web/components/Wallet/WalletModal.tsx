import { StyledModal } from "./styles";
import { WalletListContent } from "./WalletListContent";
import { useZetaWalletModalStore } from "stores";
import { shallow } from "zustand/shallow";
import { useWallet } from "@solana/wallet-adapter-react";
import { NoWalletAvailableContent } from "./NoWalletAvailableContent";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useEffect, useMemo } from "react";
import { LoadingConnect } from "./LoadingConnect";

export const WalletModal = () => {
  const { wallets, publicKey, connecting } = useWallet();

  const { isWalletModalOpen, setIsWalletModalOpen } = useZetaWalletModalStore(
    (s) => ({
      isWalletModalOpen: s.isWalletModalOpen,
      setIsWalletModalOpen: s.setIsWalletModalOpen,
    }),
    shallow
  );

  const hasNoWallet = useMemo(
    () =>
      wallets.every(
        (wallet) => wallet.readyState !== WalletReadyState.Installed
      ),
    [wallets]
  );

  useEffect(() => {
    if (publicKey !== null) {
      setIsWalletModalOpen(false);
    }
  }, [publicKey, setIsWalletModalOpen]);

  return (
    <StyledModal
      open={isWalletModalOpen}
      onClose={() => setIsWalletModalOpen(false)}
      title={hasNoWallet ? "Create Wallet" : "Connect Wallet"}
    >
      {hasNoWallet ? (
        <NoWalletAvailableContent />
      ) : connecting ? (
        <LoadingConnect />
      ) : (
        <WalletListContent />
      )}
    </StyledModal>
  );
};
