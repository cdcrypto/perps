import EditIcon from "@assets/EditIcon.webp";
import { EditWrapper } from "@components/Table/styles";
import { useState } from "react";
import { EditTriggerOrderModal } from "@components/EditTriggerOrderModal";
import { OpenTriggerOrder } from "./TriggerOrdersColumns";

export const EditTriggerOrderButton = ({
  openTriggerOrder,
}: {
  openTriggerOrder: OpenTriggerOrder;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <EditTriggerOrderModal
        openTriggerOrder={openTriggerOrder}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit - Take Profit / Stop Loss"
      />
      <EditWrapper onClick={() => setModalOpen(true)}>
        <img src={EditIcon} />
      </EditWrapper>
    </>
  );
};
