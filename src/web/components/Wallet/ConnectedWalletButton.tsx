import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "@utils/general";
import { useMemo, useCallback } from "react";
import { SingleValue } from "react-select";
import { DropdownOption } from "@components/Dropdown/Dropdown";
import { ConnectedWalletDropdown } from "./ConnectedWalletDropdown";
import { shallow } from "zustand/shallow";
import { WalletAddressLabel, WalletIcon } from "./styles";
import { useUserSettings, useZetaDepositWithdrawModalStore } from "stores";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore";

interface ConnectedWalletButtonProps {
  onOpen: () => void;
}

const dropdownOptions = [
  { value: "deposit", label: "Deposit" },
  { value: "withdraw", label: "Withdraw" },
  { value: "change", label: "Switch Wallet" },
  { value: "copy", label: "Copy Wallet Address" },
  { value: "disconnect", label: "Disconnect" },
];

export const ConnectedWalletButton = ({
  onOpen: handleOpen,
}: ConnectedWalletButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { disconnect, publicKey } = useWallet();
  const displayWalletAddress = useUserSettings((s) => s.displayWalletAddress);

  const { setIsDepositWithdrawModalOpen, setDepositWithdrawType } =
    useZetaDepositWithdrawModalStore(
      (s) => ({
        setIsDepositWithdrawModalOpen: s.setIsDepositWithdrawModalOpen,
        setDepositWithdrawType: s.setDepositWithdrawType,
      }),
      shallow
    );

  const onDepositClick = useCallback(() => {
    setDepositWithdrawType(DepositWithdrawModalState.Deposit);
    setIsDepositWithdrawModalOpen(true);
  }, [setDepositWithdrawType, setIsDepositWithdrawModalOpen]);
  const onWithdrawClick = useCallback(() => {
    setDepositWithdrawType(DepositWithdrawModalState.Withdraw);
    setIsDepositWithdrawModalOpen(true);
  }, [setDepositWithdrawType, setIsDepositWithdrawModalOpen]);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
    }
  }, [base58]);

  const handleDropdownClick = (newValue: SingleValue<DropdownOption>) => {
    switch (newValue?.value) {
      case "deposit":
        onDepositClick();
        break;
      case "withdraw":
        onWithdrawClick();
        break;
      case "copy":
        copyAddress().catch(() => { });
        break;
      case "change":
        handleOpen();
        break;
      case "disconnect":
        disconnect().catch(() => { });
        break;
    }
  };

  const shortenedAddress = displayWalletAddress ? shortenAddress(publicKey?.toString() || "") : "";

  return (
    <>
      <ConnectedWalletDropdown
        isDisabled={false}
        value={{
          value: "publickey",
          label: (displayWalletAddress ?
            <WalletAddressLabel>
              {shortenedAddress}
            </WalletAddressLabel> : null
          ),
          icon: <WalletIcon color="textEnabled" />,
        }}
        placeholderText={shortenedAddress}
        options={dropdownOptions}
        onChange={handleDropdownClick}
      />
    </>
  );
};
