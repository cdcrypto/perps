import { useWallet } from "@solana/wallet-adapter-react";
import { WalletListItem } from "./WalletListItem";
import { useMemo } from "react";
import { GridWalletListWrapper, WalletListContainer } from "./styles";
import { Text } from "@components/Text";
import { useHandleConnect } from "./useHandleConnect";

export const WalletList = () => {
  const { wallets } = useWallet();

  const handleConnect = useHandleConnect();

  const walletsLength = useMemo(() => {
    return wallets.length;
  }, [wallets.length]);

  const walletList = useMemo(() => {
    return wallets.map((w) => {
      return (
        <WalletListItem
          wallet={w}
          key={w.adapter.name}
          onClick={() => {
            handleConnect(w);
          }}
        />
      );
    });
  }, [handleConnect, wallets]);

  return (
    <WalletListContainer>
      <Text variant="body2" color="secondary">
        Which wallet do you wish to connect?
      </Text>
      {walletsLength > 2 ? (
        <GridWalletListWrapper>{walletList}</GridWalletListWrapper>
      ) : (
        walletList
      )}
    </WalletListContainer>
  );
};
