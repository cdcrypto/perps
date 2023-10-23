import { CancelAllButtonWrapper } from "./styles";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactions } from "@hooks/client/useTransactions";
import { useFlatOrders } from "@hooks/client/useFlatOrders";
import { ButtonProps } from "../Button/Button";

export const CancelAllOrdersButton = ({
  label,
  variant,
}: {
  label: string;
  variant: Required<ButtonProps["variant"]>;
}) => {
  const clientOrders = useFlatOrders();
  const transactions = useTransactions();
  const { connected } = useWallet();

  return (
    <CancelAllButtonWrapper
      testId="cancel-all-orders-button"
      variant={variant}
      disabled={!clientOrders.length || !connected}
      label={label}
      onClick={() => {
        void transactions?.cancelAllOrders();
      }}
    />
  );
};
