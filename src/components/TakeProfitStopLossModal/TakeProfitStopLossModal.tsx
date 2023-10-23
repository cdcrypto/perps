import { StyledModal } from "./styles";
import { ModalProps } from "@components/Modal";
import { TakeProfitStopLossDialog } from "./TakeProfitStopLossDialog";
import { Asset } from "@zetamarkets/sdk/dist/constants";

type RequiredProps = Required<Pick<ModalProps, "onClose">>;
type TakeProfitStopLossModalProps = Omit<ModalProps, "children"> &
  RequiredProps & { asset: Asset };

export const TakeProfitStopLossModal = ({
  open,
  asset,
  title,
  onClose,
}: TakeProfitStopLossModalProps) => {
  return (
    <StyledModal open={open} onClose={onClose} title={title}>
      <TakeProfitStopLossDialog asset={asset} onClose={onClose} />
    </StyledModal>
  );
};
