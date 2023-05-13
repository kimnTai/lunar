import React, { useState, useEffect, useRef } from "react";
import { TrelloCardAddCss } from "./style";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import type { InputRef } from "antd";
import { newCardApi } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { nextPosition } from "@/utils/cardFunc";

const TrelloCardAdd: React.FC<{
  list: ListsProps;
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ list, showAddCard, setShowAddCard }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMouseDown = (e: any) => {
    e.preventDefault();
  };

  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (showAddCard) {
      inputRef.current!.focus({ cursor: "start" });
    }
  }, [showAddCard]);

  return (
    <>
      {loading ? (
        <div className="d-center">
          <Spin />
        </div>
      ) : (
        <TrelloCardAddCss
          useadd={showAddCard.toString()}
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
                  onClick={async () => {
                    setLoading(true);

                    const res = await newCardApi({
                      name: text,
                      position: nextPosition(list.card).toString(),
                      listId: list.id,
                    });
                    if (res.status === "success") {
                      list.card.push(res.result);
                    }

                    setLoading(false);
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
      )}
    </>
  );
};

export default TrelloCardAdd;
