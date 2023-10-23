import EditIcon from "@assets/EditIcon.webp";
import { EditWrapper } from "@components/Table/styles";
import { useState } from "react";
import { EditOpenOrderModal } from "@components/EditOpenOrderModal";
import { Order } from "@zetamarkets/sdk/dist/types";

export const EditOpenOrderButton = ({ order }: { order: Order }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <EditOpenOrderModal
        order={order}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit - Open Orders"
      />
      <EditWrapper onClick={() => setModalOpen(true)}>
        <img src={EditIcon} />
      </EditWrapper>
    </>
  );
};
