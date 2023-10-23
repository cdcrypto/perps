import { Text } from "@components/Text";
import { NoWalletAvailableContainer } from "./styles";
import { NoWalletList } from "./NoWalletList";
import { CreateWalletIcon } from "@assets/CreateWalletIcon";

export const NoWalletAvailableContent = () => {
  return (
    <NoWalletAvailableContainer>
      <CreateWalletIcon />
      <Text variant="body2" color="primary">
        Select a wallet you wish to create and follow
        <br /> the instructions on their official site.
      </Text>
      <NoWalletList />
    </NoWalletAvailableContainer>
  );
};
