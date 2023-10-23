import { ConnectWalletButtonContainer } from "./styles";
import { useConnectWallet } from "@utils/setup/hooks/useConnectWallet";
export const ConnectWalletButton = () => {
  const onConnectWallet = useConnectWallet();

  return (
    <ConnectWalletButtonContainer
      variant="primary"
      label="Connect my wallet"
      onClick={onConnectWallet}
      testId="connect-wallet-button"
    />
  );
};
