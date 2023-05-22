import React, { useEffect } from "react";
import { TrelloCardModalStyled } from "./style";
import { TrelloCardModalProps } from "@/interfaces/trelloCard";
import { getCardApi } from "@/api/cards";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";
import { useCardModalContext } from "@/context/CardModalContext";

const TrelloCardModal: React.FC<TrelloCardModalProps> = (props) => {
  const { cardData, setCardData } = useCardModalContext();
  const { openModal, setOpenModal } = props;

  const handleOk = () => {
    setOpenModal({ id: "", open: false });
  };
  const handleCancel = () => {
    setOpenModal({ id: "", open: false });
  };

  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!openModal.open) {
      setCardData(null);
    } else {
      (async function () {
        try {
          const { result } = await getCardApi(openModal.id);
          setCardData(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [openModal.open]);

  return cardData !== null ? (
    <TrelloCardModalStyled
      open={openModal.open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={768}
      title={<ModalHeader listName={props.listName} />}
      footer={null}
    >
      <ModalLayout />
    </TrelloCardModalStyled>
  ) : (
    <></>
  );
};

export default TrelloCardModal;
