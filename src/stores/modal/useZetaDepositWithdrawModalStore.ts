import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const enum DepositWithdrawModalState {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  DepositSuccess = "DepositSuccess",
  WithdrawSuccess = "WithdrawSuccess",
}

export const useZetaDepositWithdrawModalStore =
  create<useZetaDepositWithdrawModalStore>()(
    devtools((set) => ({
      isDepositWithdrawModalOpen: false,
      setIsDepositWithdrawModalOpen: (isDepositWithdrawModalOpen) =>
        set({ isDepositWithdrawModalOpen }),
      depositWithdrawType: DepositWithdrawModalState.Deposit,
      setDepositWithdrawType: (depositWithdrawType) =>
        set({ depositWithdrawType }),
    }))
  );

type useZetaDepositWithdrawModalStore = {
  isDepositWithdrawModalOpen: boolean;
  setIsDepositWithdrawModalOpen: (isDepositWithdrawModalOpen: boolean) => void;
  depositWithdrawType: DepositWithdrawModalState;
  setDepositWithdrawType: (
    depositWithdrawType: DepositWithdrawModalState
  ) => void;
};
