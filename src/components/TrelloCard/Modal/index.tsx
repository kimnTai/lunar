import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCardApi } from "@/api/cards";
import Popover from "@/components/TrelloCard/Modal/Popover";
import { useCardModalContext } from "@/context/CardModalContext";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";
import { TrelloCardModalStyled } from "./style";

const TrelloCardModal: React.FC = () => {
  const { cardId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { cardData, setCardData } = useCardModalContext();
  const navigate = useNavigate();

  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!openModal) {
      setCardData(null);
    }
    if (!cardId) {
      return;
    }

    getCardApi(cardId).then(({ result }) => {
      navigate(`/board/${result.boardId}/cards/${cardId}`);
      setCardData(result);
      setOpenModal(true);
    });
  }, [openModal, cardId]);

  // 有卡片資料才顯示 Modal
  if (!cardData) return null;

  return (
    <TrelloCardModalStyled
      open={openModal}
      onOk={() => {
        setOpenModal(false);
      }}
      onCancel={() => {
        setOpenModal(false);
        navigate(`/board/${cardData?.boardId}`);
      }}
      width={768}
      title={<ModalHeader />}
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
