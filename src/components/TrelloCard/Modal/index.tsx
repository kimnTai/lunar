import React, { useEffect } from "react";
import { TrelloCardModalStyled } from "./style";
import { TrelloCardModalProps } from "@/interfaces/trelloCard";
import { getCardApi } from "@/api/cards";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";
import { useCardModalContext } from "@/context/CardModalContext";
import Popover from "@/components/TrelloCard/Modal/Popover";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const TrelloCardModal: React.FC<TrelloCardModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const { cardData, setCardData } = useCardModalContext();
  const navigate = useNavigate();
  const handleOk = () => {
    setOpenModal({ cardId: "", open: false });
  };
  const handleCancel = () => {
    setOpenModal({ cardId: "", open: false });
    navigate(`/board/${cardData?.boardId}`);
  };
  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!openModal.open) {
      setCardData(null);
    } else {
      (async function () {
        try {
          const { result } = await getCardApi(openModal.cardId);
          setCardData(result);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [openModal.open, cardData]);

  return (
    <TrelloCardModalStyled
      open={openModal.open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={768}
      title={<ModalHeader listName={cardData?.name || ""} />}
      footer={null}
    >
      <Spin
        spinning={!cardData}
        indicator={<LoadingOutlined spin={true} style={{ fontSize: 60 }} />}
        className="spin"
      ></Spin>
      <ModalLayout />
      <Popover />
    </TrelloCardModalStyled>
  );
};

export default TrelloCardModal;
