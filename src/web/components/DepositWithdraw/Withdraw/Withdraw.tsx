import { useUsdcWalletBalance } from "@hooks/api/useUsdcWalletBalance";
import { useWithdrawableBalance } from "@hooks/calcs/useWithdrawableBalance";
import { useFlatOrders } from "@hooks/client/useFlatOrders";
import { useTransactions } from "@hooks/client/useTransactions";
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
import { CancelAllOrdersButton } from "@components/CancelAllOrdersButton";
import { Header } from "@web/components/DepositWithdraw/Header";
import { Analytics, AnalyticsEvent } from "analytics";
import { UserState, useUserState } from "@hooks/client/useUserState";

interface Props {
  inputValue: string | undefined;
  setInputValue: Dispatch<SetStateAction<string | undefined>>;
  onSuccess: () => void;
}

export const Withdraw = ({ inputValue, setInputValue, onSuccess }: Props) => {
  const clientOrders = useFlatOrders();
  const withdrawableBalance = useWithdrawableBalance(5000);
  const transactions = useTransactions();
  const { refetch } = useUsdcWalletBalance();
  const userState = useUserState();

  const handleWithdraw = () => {
    if (!inputValue || !transactions) {
      return;
    }

    void transactions.withdraw(parseFloat(inputValue)).then(() => {
      void refetch();
      onSuccess();
    });
  };

  return (
    <Analytics eventType={AnalyticsEvent.ViewWithdrawModal}>
      <Header title="Withdraw" />

      {userState === UserState.CONNECTED_AND_LOADING ? (
        <DepositWithdrawSkeletonWrapper>
          <BalanceSkeleton height={56} width="40%" />
        </DepositWithdrawSkeletonWrapper>
      ) : (
        <WalletBalance
          balance={convertDollarNumberToString(withdrawableBalance ?? 0)}
          subtext="Withdrawable Balance"
          icon={<USDCIcon height={16} width={16} />}
        />
      )}
      <InputWithBadges
        value={inputValue}
        onChange={setInputValue}
        label="Amount"
        max={withdrawableBalance ?? 0}
      />
      {clientOrders.length === 0 ? (
        <ActionButton
          variant="primary"
          disabled={!inputValue || inputValue === "0"}
          label="Withdraw"
          onClick={handleWithdraw}
        />
      ) : (
        <CancelAllOrdersButton
          label="Cancel all open orders"
          variant="primary"
        />
      )}
    </Analytics>
  );
};
