import { ChecklistProps } from "@/interfaces/checklists";
import {
  AlignLeftOutlined,
  CheckSquareOutlined,
  MessageOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import React from "react";
import { CardInnerIconStyled, TotalCheckItemStyled } from "./style";

const CardInnerIcon: React.FC<{
  commentLength: number;
  attachmentLength: number;
  checklist: ChecklistProps[];
}> = ({ commentLength, attachmentLength, checklist }) => {
  const isVisible =
    commentLength > 0 || attachmentLength > 0 || checklist.length > 0;

  const totalCheckItem = checklist.flatMap(({ checkItem }) => checkItem).length;
  const finishCheckItem = checklist
    .flatMap(({ checkItem }) => checkItem)
    .filter(({ completed }) => completed).length;

  return (
    <>
      {isVisible && (
        <CardInnerIconStyled>
          <div>
            <AlignLeftOutlined />
          </div>
          {commentLength > 0 && (
            <div className="d-flex">
              <div>
                <MessageOutlined />
              </div>
              <div className="mgleft5">{commentLength}</div>
            </div>
          )}

          {attachmentLength > 0 && (
            <div className="d-flex">
              <div>
                <PaperClipOutlined />
              </div>
              <div className="mgleft5">{attachmentLength}</div>
            </div>
          )}

          {totalCheckItem > 0 && (
            <TotalCheckItemStyled
              color={finishCheckItem === totalCheckItem ? "#ffffff" : ""}
              backgroundColor={
                finishCheckItem === totalCheckItem ? "#1f845a" : ""
              }
            >
              <div>
                <CheckSquareOutlined />
              </div>
              <div className="mgleft5">{`${finishCheckItem}/${totalCheckItem}`}</div>
            </TotalCheckItemStyled>
          )}
        </CardInnerIconStyled>
      )}
    </>
  );
};

export default CardInnerIcon;
