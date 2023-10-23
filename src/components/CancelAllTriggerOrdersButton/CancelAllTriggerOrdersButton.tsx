import { useTransactions } from "@hooks/client/useTransactions";
import { ButtonProps } from "../Button/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import { CancelAllButtonWrapper } from "@components/CancelAllOrdersButton/styles";
import { useOpenTriggerOrders } from "@hooks/client/useOpenTriggerOrders";

interface CancelAllTriggerOrdersButtonProps {
  label: string;
  variant: Required<ButtonProps["variant"]>;
}

export const CancelAllTriggerOrdersButton = ({
  label,
  variant,
}: CancelAllTriggerOrdersButtonProps) => {
  const transactions = useTransactions();
  const triggerOrders = useOpenTriggerOrders();
  const { connected } = useWallet();

  const handleCloseAllTriggerOrders = () => {
    void transactions?.cancelAllTriggerOrders(undefined);
  };

  return (
    <CancelAllButtonWrapper
      label={label}
      variant={variant}
      disabled={!triggerOrders.length || !connected}
      onClick={handleCloseAllTriggerOrders}
    />
  );
};
