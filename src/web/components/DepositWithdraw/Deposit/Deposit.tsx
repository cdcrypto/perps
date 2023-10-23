import { useUsdcWalletBalance } from "@hooks/api/useUsdcWalletBalance";
import { useTransactions } from "@hooks/client/useTransactions";
import { DEX_PRICE_PRECISION } from "@utils/constants";
import { convertDollarNumberToString } from "@utils/general";
import { Dispatch, SetStateAction } from "react";
import { WalletBalance } from "@web/components/DepositWithdraw/WalletBalance";
import {
  ActionButton,
  DepositWithdrawSkeletonWrapper,
  BalanceSkeleton,
} from "@web/components/DepositWithdraw/styles";
import { InputWithBadges } from "@web/components/DepositWithdraw/InputWithBadges";
import USDCIcon from "@assets/coins/USDCIcon";
import { Header } from "../Header";
import { Analytics, AnalyticsEvent } from "analytics";
import { UserState, useUserState } from "@hooks/client/useUserState";

interface Props {
  inputValue: string | undefined;
  setInputValue: Dispatch<SetStateAction<string | undefined>>;
  onSuccess: () => void;
}

export const Deposit = ({ onSuccess, inputValue, setInputValue }: Props) => {
  const transactions = useTransactions();
  const { balance, refetch } = useUsdcWalletBalance();
  const userState = useUserState();

  const handleDeposit = () => {
    if (!inputValue || !transactions) {
      return;
    }

    void transactions.deposit(parseFloat(inputValue)).then(() => {
      void refetch();
      onSuccess();
    });
  };

  return (
    <Analytics eventType={AnalyticsEvent.ViewDepositModal}>
      <Header title="Deposit" />

      {userState === UserState.CONNECTED_AND_LOADING ? (
        <DepositWithdrawSkeletonWrapper>
          <BalanceSkeleton height={56} width="40%" />
        </DepositWithdrawSkeletonWrapper>
      ) : (
        <WalletBalance
          balance={convertDollarNumberToString(
            balance ?? 0,
            undefined,
            DEX_PRICE_PRECISION
          )}
          subtext="Available Wallet Balance"
          icon={<USDCIcon height={16} width={16} />}
        />
      )}
      <InputWithBadges
        value={inputValue}
        onChange={setInputValue}
        label="Amount"
        max={balance ?? 0}
      />
      <ActionButton
        testId="deposit-withdraw-action-button"
        variant="primary"
        label="Deposit"
        disabled={!inputValue || inputValue === "0"}
        onClick={handleDeposit}
      />
    </Analytics>
  );
};
