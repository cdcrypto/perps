import { ModalProps } from "@components/Modal";
import { EditTriggerOrderDialog } from "./EditTriggerOrderDialog";
import { StyledModal } from "@components/ClosePositionModal/styles";
import { OpenTriggerOrder } from "@web/components/TriggerOrdersTable/TriggerOrdersColumns";

type RequiredProps = Required<Pick<ModalProps, "onClose">>;
type EditTriggerOrderModalProps = Omit<ModalProps, "children"> &
  RequiredProps & {
    openTriggerOrder: OpenTriggerOrder;
  };

export const EditTriggerOrderModal = ({
  open,
  onClose,
  openTriggerOrder,
  title,
}: EditTriggerOrderModalProps) => {
  return (
    <StyledModal open={open} onClose={onClose} title={title}>
      <EditTriggerOrderDialog openTriggerOrder={openTriggerOrder} onClose={onClose} />
    </StyledModal>
  );
};
