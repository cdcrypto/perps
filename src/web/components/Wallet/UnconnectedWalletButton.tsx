import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { UnconnectedWalletButtonWrapper } from "./styles";

interface UnconnectedWalletButtonProps {
  onOpen: () => void;
}

export const UnconnectedWalletButton = ({
  onOpen: handleOpen,
}: UnconnectedWalletButtonProps) => {
  const { connecting, connected } = useWallet();

  const label = useMemo(() => {
    if (connecting) return "Connecting ...";
    if (connected) return "Connected";
    return "Connect my wallet";
  }, [connecting, connected]);

  return (
    <UnconnectedWalletButtonWrapper
      variant="primary"
      label={label}
      data-testid="connect-wallet-button"
      onClick={handleOpen}
    />
  );
};
