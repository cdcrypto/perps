import { ModalProps } from "@components/Modal";
import { ClosePositionDialog } from "./ClosePositionDialog";
import { StyledModal } from "./styles";
import { Asset } from "@zetamarkets/sdk/dist/constants";

type RequiredProps = Required<Pick<ModalProps, "onClose">>;
type ClosePositionModalProps = Omit<ModalProps, "children"> &
  RequiredProps & {
    asset: Asset;
  };

export const ClosePositionModal = ({
  open,
  onClose,
  asset,
  title,
}: ClosePositionModalProps) => {
  return (
    <StyledModal open={open} onClose={onClose} title={title}>
      <ClosePositionDialog asset={asset} onClose={onClose} />
    </StyledModal>
  );
};
