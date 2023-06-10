import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Popover from "@/components/TrelloCard/Modal/Popover";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { getCardAction } from "@/redux/cardSlice";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";
import { TrelloCardModalStyled } from "./style";

const TrelloCardModal: React.FC = () => {
  const cardData = useParamCard();
  const [openModal, setOpenModal] = useState(false);
  const { setCardData } = useCardModalContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!cardData) {
      return;
    }

    setCardData(JSON.parse(JSON.stringify(cardData)));
    setOpenModal(true);

    if (openModal) {
      dispatch(getCardAction(cardData._id));
    }
  }, [openModal, cardData?._id]);

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
      <ModalLayout />
      <Popover />
    </TrelloCardModalStyled>
  );
};

export default TrelloCardModal;
