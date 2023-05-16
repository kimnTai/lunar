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
            <div className="d-center">
              <Input
                value={text}
                onChange={(e: any) => setText(e.target.value)}
                ref={inputRef}
                placeholder="輸入標題"
                style={{ width: "calc(100% - 24px - 24px - 24px)" }}
              />
              <Button
                className="d-center"
                type="text"
                icon={<CloseOutlined style={{ color: "white" }} />}
                onClick={() => {
                  setShowAddCard(false);
                }}
                style={{ marginLeft: "16px", height: "24px", width: "24px" }}
              />
              <Button
                className="d-center"
                type="text"
                icon={<EllipsisOutlined style={{ color: "white" }} />}
                style={{ marginLeft: "8px", height: "24px", width: "24px" }}
              ></Button>
            </div>
            <div className="bottom-func">
              <Button
                type="primary"
                onClick={async () => {
                  console.log("in ");
                  setLoading(true);

                  await newCardApi({
                    name: text,
                    position: nextPosition(list.card).toString(),
                    listId: list.id,
                  })
                    .then((res) => {
                      if (res.status === "success") {
                        list.card.push(res.result);
                      }
                    })
                    .catch(() => {
                      setLoading(false);
                    });

                  setLoading(false);
                  setShowAddCard(false);
                }}
                style={{ backgroundColor: "var(--black23)", width: "100%" }}
              >
                新增卡片
              </Button>
            </div>
          </div>
        </TrelloCardAddCss>
      )}
    </>
  );
};

export default TrelloCardAdd;
