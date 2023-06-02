import React, { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { newChecklistApi } from "@/api/cards";
import { nextPosition } from "@/utils/cardFunc";
import { PopoverSectionTitleStyled } from "../PopoverStyle";

const PopoverCheckList: React.FC = () => {
  const { cardData, setCardData, handleClosePopover } = useCardModalContext();
  const { id = "", checklist = [] } = cardData ?? {};

  const [checkListTitle, setCheckListTitle] = useState<string>("待辦清單");

  const handleAddCheckList = async () => {
    if (checkListTitle.trim() === "") {
      return;
    }

    // 新增的排在最後面
    try {
      const { result } = await newChecklistApi({
        cardId: id,
        name: checkListTitle,
        position: nextPosition(checklist),
      });
      setCardData({
        ...cardData!,
        checklist: [...checklist!, result],
      });
      handleClosePopover();
    } catch (error) {
      console.log("error", error);
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
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Button
        type="primary"
        block
        onClick={handleAddCheckList}
        style={{ marginBlock: "8px" }}
      >
        新增
      </Button>
    </>
  );
};

export default PopoverCheckList;
