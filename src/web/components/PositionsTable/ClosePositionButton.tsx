import OutlinedCancelIcon from "@assets/OutlinedCancelIcon";
import { ClosePositionModal } from "@components/ClosePositionModal";
import { CancelWrapper } from "@components/Table/styles";
import { Asset } from "@zetamarkets/sdk/dist/constants";
import { useState } from "react";

export const ClosePositionRawButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <CancelWrapper onClick={onClick}>
      <OutlinedCancelIcon />
    </CancelWrapper>
  );
};
export const ClosePositionButton = ({ asset }: { asset: Asset }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <ClosePositionModal
        asset={asset}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Close Position"
      />
      <ClosePositionRawButton onClick={() => setModalOpen(true)} />
    </div>
  );
};
