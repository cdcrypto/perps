import { Modal } from "@components/Modal";
import { useEffect, useState } from "react";
import { DepositWithdrawContainer } from "./styles";
import { Deposit } from "./Deposit";
import { Withdraw } from "./Withdraw";
import { Success } from "./Success";
import { shallow } from "zustand/shallow";
import {
  DepositWithdrawModalState,
  useZetaDepositWithdrawModalStore,
} from "stores/modal/useZetaDepositWithdrawModalStore";

export const DepositWithdrawModal = () => {
  // TODO: No logic should exist in the modal itself, only in the components it renders.
  const [inputValue, setInputValue] = useState<string>();
  const {
    isDepositWithdrawModalOpen,
    setIsDepositWithdrawModalOpen,
    depositWithdrawType,
    setDepositWithdrawType,
  } = useZetaDepositWithdrawModalStore(
    (s) => ({
      isDepositWithdrawModalOpen: s.isDepositWithdrawModalOpen,
      setIsDepositWithdrawModalOpen: s.setIsDepositWithdrawModalOpen,
      depositWithdrawType: s.depositWithdrawType,
      setDepositWithdrawType: s.setDepositWithdrawType,
    }),
    shallow
  );

  // TODO: find a better way to handle this
  useEffect(() => {
    if (!isDepositWithdrawModalOpen) {
      // wait for modal closing animation
      const timer = setTimeout(
        () => setDepositWithdrawType(depositWithdrawType),
        350
      );
      return () => clearTimeout(timer);
    } else {
      setDepositWithdrawType(depositWithdrawType);
    }
  }, [depositWithdrawType, isDepositWithdrawModalOpen, setDepositWithdrawType]);

  return (
    <Modal
      open={isDepositWithdrawModalOpen}
      onClose={() => setIsDepositWithdrawModalOpen(false)}
    >
      <DepositWithdrawContainer>
        {depositWithdrawType === DepositWithdrawModalState.Deposit && (
          <Deposit
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSuccess={() =>
              setDepositWithdrawType(DepositWithdrawModalState.DepositSuccess)
            }
          />
        )}
        {depositWithdrawType === DepositWithdrawModalState.Withdraw && (
          <Withdraw
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSuccess={() =>
              setDepositWithdrawType(DepositWithdrawModalState.WithdrawSuccess)
            }
          />
        )}
        {depositWithdrawType === DepositWithdrawModalState.DepositSuccess && (
          <Success
            successType={DepositWithdrawModalState.DepositSuccess}
            amount={inputValue}
            onClose={() => setIsDepositWithdrawModalOpen(false)}
          />
        )}
        {depositWithdrawType === DepositWithdrawModalState.WithdrawSuccess && (
          <Success
            successType={DepositWithdrawModalState.WithdrawSuccess}
            amount={inputValue}
            onClose={() => setIsDepositWithdrawModalOpen(false)}
          />
        )}
      </DepositWithdrawContainer>
    </Modal>
  );
};
