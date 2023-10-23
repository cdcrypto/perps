import { phantom } from "@assets/wallets/phantom";
import { NoWalletListItem } from "./NoWalletListItem";
import { WalletListItem } from "./WalletListItem";
import { GridWalletListWrapper, WalletListContainer } from "./styles";
import { Text } from "@components/Text";
import { solflare } from "@assets/wallets/solflare";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { WalletConnectWalletName } from "@solana/wallet-adapter-walletconnect";
import { useHandleConnect } from "./useHandleConnect";

const recommendedWallets = [phantom, solflare];

export const NoWalletList = () => {
  const handleConnect = useHandleConnect();
  const { wallets } = useWallet();

  const walletConnectWallet = useMemo(
    () =>
      wallets.find((wallet) => wallet.adapter.name === WalletConnectWalletName),
    [wallets]
  );

  return (
    <WalletListContainer>
      <Text variant="body2" color="secondary">
        Which wallet do you wish to connect?
      </Text>
      <GridWalletListWrapper>
        {recommendedWallets.map((wallet) => (
          <NoWalletListItem
            key={wallet.name}
            name={wallet.name}
            icon={wallet.icon}
            url={wallet.url}
          />
        ))}
        {!!walletConnectWallet && (
          <WalletListItem
            wallet={walletConnectWallet}
            key={walletConnectWallet.adapter.name}
            onClick={() => {
              handleConnect(walletConnectWallet);
            }}
          />
        )}
      </GridWalletListWrapper>
    </WalletListContainer>
  );
};
