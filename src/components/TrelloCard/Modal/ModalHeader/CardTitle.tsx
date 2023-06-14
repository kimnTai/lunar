import React, { useEffect, useRef, useState } from "react";
import { Col, Input, Row } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { updateCardAction } from "@/redux/cardSlice";
import { CardTitleStyled } from "./style";

const CardTitle: React.FC = () => {
  const cardData = useParamCard();
  const [isEdit, setIsEdit] = useState(false);
  const [titleFiled, setTitleFiled] = useState(cardData?.name || "");
  const textareaRef = useRef<TextAreaRef>(null);

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

  useEffect(() => {
    const handleClickOutside = ({ target }: PointerEvent) => {
      if (
        !textareaRef?.current?.resizableTextArea?.textArea.contains(
          target as Node
        )
      ) {
        setIsEdit(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <CardTitleStyled>
      <Row align="middle" gutter={4}>
        <Col flex="auto">
          {isEdit ? (
            <Input.TextArea
              ref={textareaRef}
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
