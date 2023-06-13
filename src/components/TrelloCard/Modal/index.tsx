import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Popover from "@/components/TrelloCard/Modal/Popover";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { getCardAction } from "@/redux/cardSlice";
import ModalHeader from "./ModalHeader";
import ModalLayout from "./ModalLayout";
import { TrelloCardModalStyled } from "./style";

const TrelloCardModal: React.FC = () => {
  const cardData = useParamCard();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 打開卡片 Modal 時，取得卡片資料
  useEffect(() => {
    if (!cardData) {
      return;
    }

    dispatch(getCardAction(cardData._id));
  }, [cardData?._id]);

  const handleCancel = () => {
    navigate(`/board/${cardData?.boardId}`);
  };

  // 有卡片資料才顯示 Modal
  if (!cardData) return null;

  return (
    <TrelloCardModalStyled
      open={Boolean(cardData)}
      onOk={handleCancel}
      onCancel={handleCancel}
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
