import ShareIcon from "@assets/ShareIcon";
import { SharePositionDialogProps, SharePositionModal } from "@components/SharePositionModal";
import { CancelWrapper } from "@components/Table/styles";
import { useState } from "react";


export const SharePositionRawButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <CancelWrapper onClick={() => onClick()}>
      <ShareIcon />
    </CancelWrapper>
  );
};

export const SharePositionButton = ({
  asset,
  unrealizedPnl,
  unrealizedPnlPercentage,
  entryPrice,
  markPrice,
  initialMargin,
  side,
}: SharePositionDialogProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SharePositionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        unrealizedPnl={unrealizedPnl}
        unrealizedPnlPercentage={unrealizedPnlPercentage}
        asset={asset}
        entryPrice={entryPrice}
        markPrice={markPrice}
        initialMargin={initialMargin}
        side={side}
      />
      <SharePositionRawButton onClick={() => setModalOpen(true)} />
    </>
  );
};
