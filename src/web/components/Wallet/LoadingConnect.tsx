import { useWallet } from "@solana/wallet-adapter-react";
import {
  LoadingConnectBody,
  LoadingGraphicsWrapper,
  WalletListItemIcon,
} from "./styles";
import { ZetaWalletIcon } from "@assets/ZetaWalletIcon";
import { Text } from "@components/Text";
import { BlinkingLoader } from "./BlinkingLoader";

export const LoadingConnect = () => {
  const { wallet } = useWallet();

  return (
    <LoadingConnectBody>
      <LoadingGraphicsWrapper>
        <WalletListItemIcon src={wallet?.adapter.icon} />
        <BlinkingLoader />
        <ZetaWalletIcon />
      </LoadingGraphicsWrapper>
      <Text variant="body2" color="primary">
        Connecting...
      </Text>
    </LoadingConnectBody>
  );
};
