import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Card } from "antd";
import type { InputRef } from "antd";
import { useDispatch } from "react-redux";
import CONSTANTS from "@/redux/constants";

const TrelloCardAddCss = styled(Card)<{ useAdd: string }>`
  // height: ${(props) => props.useAdd === "true" && "1px"};
  min-height: 1px;
  display: ${(props) => (props.useAdd === "true" ? "block" : "none")};
  .bottom-func {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
  .addCard {
    color: black;
    padding: 6px 4px;
  }
`;

const TrelloCardAdd: React.FC<{
  listIndex: number;
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ listIndex, showAddCard, setShowAddCard }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleMouseDown = (e: any) => {
    e.preventDefault();
  };
  // const handleClick = () => {
  //   setShowAddCard(false);
  //   setText("");
  // };
  // const handleBlur = (e: any) => {
  //   console.log(e);
  // };
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (showAddCard) {
      inputRef.current!.focus({ cursor: "start" });
    }
  }, [showAddCard]);

  return (
    <TrelloCardAddCss
      useAdd={showAddCard.toString()}
      bordered={false}
      bodyStyle={{ padding: 0 }}
    >
      <div
        tabIndex={showAddCard ? 0 : undefined}
        onBlur={(_e) => {
          setText("");
          setShowAddCard(false);
        }}
        onMouseDown={handleMouseDown}
      >
        <Input.TextArea
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          ref={inputRef}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3 }}
          style={{ width: "100%" }}
        />
        <div className="bottom-func">
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              onClick={() => {
                dispatch({
                  type: CONSTANTS.ADD_CARD,
                  payload: { title: text, listIndex },
                });
                setShowAddCard(false);
              }}
            >
              新增卡片
            </Button>
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => {
                setShowAddCard(false);
              }}
              style={{ marginLeft: "5px" }}
            />
          </div>
          <Button icon={<EllipsisOutlined />}></Button>
        </div>
      </div>
    </TrelloCardAddCss>
  );
};

export default TrelloCardAdd;
