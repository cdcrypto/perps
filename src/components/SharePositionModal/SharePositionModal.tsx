import { ModalProps } from "@components/Modal";
import { SharePositionDialog, SharePositionDialogProps } from "./SharePositionDialog";
import { SharePositionStyledModal } from "./styles";

type RequiredProps = Required<Pick<ModalProps, "onClose">>;

type SharePositionModalProps = Omit<ModalProps, "children"> & RequiredProps & SharePositionDialogProps;


export const SharePositionModal = ({
  open,
  onClose,
  title,
  unrealizedPnl,
  unrealizedPnlPercentage,
  asset,
  entryPrice,
  markPrice,
  initialMargin,
  side
}: SharePositionModalProps) => {
  return (
    <SharePositionStyledModal open={open} onClose={onClose} title={title}>
      <SharePositionDialog
        side={side}
        initialMargin={initialMargin}
        entryPrice={entryPrice}
        markPrice={markPrice}
        asset={asset}
        unrealizedPnl={unrealizedPnl}
        unrealizedPnlPercentage={unrealizedPnlPercentage}
      />
    </SharePositionStyledModal>
  );
};
