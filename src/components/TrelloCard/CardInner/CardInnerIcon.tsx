import { ChecklistProps } from "@/interfaces/checklists";
import {
  AlignLeftOutlined,
  CheckSquareOutlined,
  MessageOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import React from "react";

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

  // FIXME:排版需要優化
  return (
    <>
      {isVisible && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "160px",
            padding: "0 8px",
            marginTop: "6px",
          }}
        >
          <div>
            <AlignLeftOutlined />
          </div>
          {commentLength > 0 && (
            <div style={{ display: "flex" }}>
              <div>
                <MessageOutlined />
              </div>
              <div style={{ marginLeft: "5px" }}>{commentLength}</div>
            </div>
          )}

          {attachmentLength > 0 && (
            <div style={{ display: "flex" }}>
              <div>
                <PaperClipOutlined />
              </div>
              <div style={{ marginLeft: "5px" }}>{attachmentLength}</div>
            </div>
          )}

          {totalCheckItem > 0 && (
            <div style={{ display: "flex" }}>
              <div>
                <CheckSquareOutlined />
              </div>
              <div
                style={{ marginLeft: "5px" }}
              >{`${finishCheckItem}/${totalCheckItem}`}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardInnerIcon;
