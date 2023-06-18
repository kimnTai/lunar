import React, { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { newChecklistAction } from "@/redux/cardSlice";
import { nextPosition } from "@/utils/cardFunc";
import { PopoverSectionTitleStyled } from "../PopoverStyle";

const PopoverCheckList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();
  const { handleClosePopover } = useCardModalContext();

  const [checkListTitle, setCheckListTitle] = useState<string>("待辦清單");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddCheckList = async () => {
    if (checkListTitle.trim() === "" || !cardData) {
      return;
    }
    setIsSubmitting(true);

    // 新增的排在最後面
    try {
      await dispatch(
        newChecklistAction({
          cardId: cardData._id,
          name: checkListTitle,
          position: `${nextPosition(cardData.checklist)}`,
        })
      );
      handleClosePopover();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PopoverSectionTitleStyled>標題</PopoverSectionTitleStyled>
      <Row>
        <Col span={24}>
          <Input
            type="text"
            placeholder="待辦清單"
            value={checkListTitle}
            onChange={(e) => setCheckListTitle(e.target.value)}
            onPressEnter={() => {
              handleAddCheckList();
            }}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Button
        type="primary"
        block
        onClick={handleAddCheckList}
        style={{ marginBlock: "8px" }}
        loading={isSubmitting}
      >
        新增
      </Button>
    </>
  );
};

export default PopoverCheckList;
