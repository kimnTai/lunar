import React from "react";
import { Button } from "antd";
import { TrelloCardModalStyled } from "../style";
import { TrelloCardModalProps } from "@/interfaces/trelloCard";

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
    >
      index
    </TrelloCardModalStyled>
  );
};

export default TrelloCardModal;
