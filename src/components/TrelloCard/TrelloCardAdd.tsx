import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Spin, type InputRef } from "antd";
import { CloseOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch } from "@/hooks";
import { ListsProps } from "@/interfaces/lists";
import { newCardAction } from "@/redux/cardSlice";
import { nextPosition } from "@/utils/cardFunc";
import { TrelloCardAddCss } from "./style";

const TrelloCardAdd: React.FC<{
  list: ListsProps;
}> = ({ list }) => {
  const { showAddCard, setShowAddCard } = useListsContext();
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const [spinning, setSpinning] = useState(false);
  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (showAddCard && inputRef?.current) {
      inputRef?.current.focus({ cursor: "start" });
    }
  }, [showAddCard]);

  return (
    <Spin spinning={spinning}>
      <TrelloCardAddCss
        useadd={showAddCard.toString()}
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div
          tabIndex={showAddCard ? 0 : undefined}
          onBlur={() => {
            setText("");
            setShowAddCard(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="d-center">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
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
                if (text.length < 2) {
                  return;
                }
                setSpinning(true);

                try {
                  await dispatch(
                    newCardAction({
                      name: text,
                      position: `${nextPosition(list.card)}`,
                      listId: list.id,
                      boardId: list.boardId,
                    })
                  );
                } catch (error) {}

                setSpinning(false);
                setShowAddCard(false);
                setText("");
              }}
              style={{ backgroundColor: "var(--black23)", width: "100%" }}
            >
              新增卡片
            </Button>
          </div>
        </div>
      </TrelloCardAddCss>
    </Spin>
  );
};

export default TrelloCardAdd;
