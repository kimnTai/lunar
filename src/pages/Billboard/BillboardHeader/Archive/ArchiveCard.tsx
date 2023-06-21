import React from "react";
import { Button, List } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import { ClosedItemsProps } from "@/interfaces/boards";
import { deleteCardAction, moveCardAction } from "@/redux/cardSlice";

const ArchiveCard: React.FC<{
  data: ClosedItemsProps;
  setData: React.Dispatch<React.SetStateAction<ClosedItemsProps>>;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<"CARD" | "LIST">>;
}> = ({ data, setSpinning, setData, setState }) => {
  const dispatch = useAppDispatch();

  const removeItem = (cardId: string) => {
    setData((pre) => ({
      ...pre,
      closedCard: pre.closedCard.filter((value) => value._id !== cardId),
    }));
  };

  const handleOpen = async (cardId: string) => {
    setSpinning(true);
    await dispatch(
      moveCardAction({
        cardId: cardId,
        closed: false,
      })
    );
    removeItem(cardId);
    setSpinning(false);
  };

  const handleRemove = async (cardId: string) => {
    setSpinning(true);
    await dispatch(deleteCardAction(cardId));
    removeItem(cardId);
    setSpinning(false);
  };

  return (
    <List
      bordered
      header={
        <div
          className="d-flex"
          style={{
            justifyContent: "space-between",
          }}
        >
          <p>卡片</p>
          <Button size="small" onClick={() => setState("LIST")}>
            切換至列表
          </Button>
        </div>
      }
      dataSource={data?.closedCard}
      pagination={{
        onChange: (_page) => {},
        pageSize: 10,
      }}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              size="small"
              type="primary"
              icon={<UndoOutlined />}
              onClick={() => handleOpen(item._id)}
            >
              發送到看板
            </Button>,
            <Button
              danger
              size="small"
              type="primary"
              onClick={() => handleRemove(item._id)}
            >
              刪除
            </Button>,
          ]}
        >
          {/** TODO: 理想這邊要顯示完整 CardInner 卡片元件，
           * 並且可以點擊查看該封存卡片
           * */}
          {item.name}
        </List.Item>
      )}
    />
  );
};

export default ArchiveCard;
