import OutlinedCancelIcon from "@assets/OutlinedCancelIcon";
import { useTransactions } from "@hooks/client/useTransactions";
import { TriggerOrder } from "@zetamarkets/sdk/dist/types";
import { Container } from "./styles";

interface CloseTriggerOrderButtonProps {
  triggerOrder: TriggerOrder;
}

export const CancelTriggerOrderButton = ({
  triggerOrder,
}: CloseTriggerOrderButtonProps) => {
  const transactions = useTransactions();

  const handleCancel = () => {
    void transactions?.cancelTriggerOrder(triggerOrder);
  };

  return (
    <Container onClick={handleCancel}>
      <OutlinedCancelIcon />
    </Container>
  );
};
