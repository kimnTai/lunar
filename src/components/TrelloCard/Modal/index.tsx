import React, { useEffect, useState } from "react";
import { TrelloCardModalStyled } from "./style";
import { TrelloCardModalProps } from "@/interfaces/trelloCard";
import { CardsProps } from "@/interfaces/cards";
import { getCardApi } from "@/api/cards";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";

const TrelloCardModal: React.FC<TrelloCardModalProps> = (props) => {
  const { openModal, setOpenModal } = props;

  const [cardData, setCardData] = useState<CardsProps | null>(null);

  const handleOk = () => {
    setOpenModal({ id: "", open: false });
  };
  const handleCancel = () => {
    setOpenModal({ id: "", open: false });
  };
  return (

  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!openModal.open) return;

    (async function () {
      try {
        const { result }: { result: CardsProps } = await getCardApi(
          openModal.id
        );
        setCardData(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [openModal.open]);
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
