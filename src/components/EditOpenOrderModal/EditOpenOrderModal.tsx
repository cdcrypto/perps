import { ModalProps } from "@components/Modal";
import { EditOpenOrderDialog } from "./EditOpenOrderDialog";
import { StyledModal } from "@components/ClosePositionModal/styles";
import { Order } from "@zetamarkets/sdk/dist/types";

type RequiredProps = Required<Pick<ModalProps, "onClose">>;
type EditOpenOrderModalProps = Omit<ModalProps, "children"> &
  RequiredProps & {
    order: Order;
  };

export const EditOpenOrderModal = ({
  open,
  onClose,
  order,
  title,
}: EditOpenOrderModalProps) => {
  return (
    <StyledModal open={open} onClose={onClose} title={title}>
      <EditOpenOrderDialog order={order} onClose={onClose} />
    </StyledModal>
  );
};
