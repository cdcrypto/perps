import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectedWalletButton } from "./ConnectedWalletButton";
import { UnconnectedWalletButton } from "./UnconnectedWalletButton";
import { WalletButtonContainer } from "@web/components/Wallet/styles";
import { useZetaWalletModalStore } from "stores";
import { useConnectWallet } from "@utils/setup/hooks/useConnectWallet";

export const WalletMultiButton = ({ className }: { className?: string }) => {
  const { connected } = useWallet();

  const setIsWalletModalOpen = useZetaWalletModalStore(
    (s) => s.setIsWalletModalOpen
  );

  const onConnectWallet = useConnectWallet();

  return (
    <WalletButtonContainer className={className}>
      {!connected ? (
        <UnconnectedWalletButton onOpen={onConnectWallet} />
      ) : (
        <ConnectedWalletButton onOpen={() => setIsWalletModalOpen(true)} />
      )}
    </WalletButtonContainer>
  );
};
