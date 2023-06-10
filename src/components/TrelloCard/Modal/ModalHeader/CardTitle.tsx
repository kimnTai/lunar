import React, { useState } from "react";
import { Col, Input, Row } from "antd";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { updateCardAction } from "@/redux/cardSlice";
import { CardTitleStyled } from "./style";

const CardTitle: React.FC = () => {
  const cardData = useParamCard();
  const [isEdit, setIsEdit] = useState(false);
  const [titleFiled, setTitleFiled] = useState(cardData?.name || "");

  const dispatch = useAppDispatch();

  const submitTitleField = () => {
    if (!cardData) {
      return;
    }
    if (titleFiled !== cardData.name) {
      dispatch(
        updateCardAction({
          cardId: cardData.id,
          name: titleFiled,
        })
      );
    }
    setIsEdit(false);
  };
  return (
    <CardTitleStyled>
      <Row align="middle" gutter={4}>
        <Col flex="auto">
          {isEdit ? (
            <Input.TextArea
              autoSize
              placeholder="請輸入標題"
              value={titleFiled}
              onChange={(e) => setTitleFiled(e.target.value)}
              onFocus={() => setIsEdit(true)}
              onBlur={submitTitleField}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  submitTitleField();
                }
              }}
              className="titleInput"
            />
          ) : (
            <h2 onClick={() => setIsEdit(true)} className="titleTxt">
              {titleFiled}
            </h2>
          )}
        </Col>
      </Row>
    </CardTitleStyled>
  );
};

export default CardTitle;
