import React from "react";
import { Button } from "antd";
import { TrelloCardModalStyled } from "./style";
import { TrelloCardModalProps } from "@/interfaces/trelloCard";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";

const TrelloCardModal: React.FC<TrelloCardModalProps> = (props) => {
  const { openModal, setOpenModal } = props;
  const handleOk = () => {
    setOpenModal({ id: "", open: false });
  };
  const handleCancel = () => {
    setOpenModal({ id: "", open: false });
  };
  return (
    <TrelloCardModalStyled
      open={openModal.open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={768}
      title={<ModalHeader />}
      footer={null}
    >
      <ModalLayout />
    </TrelloCardModalStyled>
  );
};

export default TrelloCardModal;
