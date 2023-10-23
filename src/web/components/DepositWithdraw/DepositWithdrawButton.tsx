import { Button } from "@components/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { shallow } from "zustand/shallow";
import { useCalculationStore, useZetaDepositWithdrawModalStore } from "stores";
import { DepositWithdrawModalState } from "stores/modal/useZetaDepositWithdrawModalStore";
interface DepositWithdrawButtonProps {
  isDepositOrWithdraw:
  | DepositWithdrawModalState.Deposit
  | DepositWithdrawModalState.Withdraw;
}

export const DepositWithdrawButton = ({
  isDepositOrWithdraw,
}: DepositWithdrawButtonProps) => {
  const { setIsDepositWithdrawModalOpen, setDepositWithdrawType } =
    useZetaDepositWithdrawModalStore(
      (s) => ({
        setIsDepositWithdrawModalOpen: s.setIsDepositWithdrawModalOpen,
        setDepositWithdrawType: s.setDepositWithdrawType,
      }),
      shallow
    );
  const totalAccountEquity = useCalculationStore((s) => s.totalAccountEquity);
  const { connected } = useWallet();

  return (
    <Button
      testId="deposit-withdraw-button"
      variant={
        isDepositOrWithdraw === DepositWithdrawModalState.Deposit
          ? "primary"
          : "secondary"
      }
      color="highlight"
      label={
        isDepositOrWithdraw === DepositWithdrawModalState.Deposit
          ? "Deposit"
          : "Withdraw"
      }
      disabled={
        !connected ||
        (isDepositOrWithdraw === DepositWithdrawModalState.Withdraw &&
          !totalAccountEquity)
      }
      onClick={() => {
        setDepositWithdrawType(isDepositOrWithdraw);
        setIsDepositWithdrawModalOpen(true);
      }}
    />
  );
};
