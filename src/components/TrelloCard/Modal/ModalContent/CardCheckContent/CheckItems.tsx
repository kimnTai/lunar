import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Checkbox, Progress } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { updateCheckItemApi } from "@/api/cards";
import { useCardModalContext } from "@/context/CardModalContext";

const CheckItems: React.FC<{ checklistIndex: number }> = ({
  checklistIndex = 0,
}) => {
  const { cardData, setCardData } = useCardModalContext();
  const { id = "", checklist = [] } = cardData ?? {};

  const getProgressPercent = () => {
    const listItemsTotal = checklist[checklistIndex].checkItem.length;
    const listItemsCompleted = checklist[checklistIndex].checkItem.filter(
      (item) => item.completed
    ).length;

    return Math.round((listItemsCompleted / listItemsTotal) * 100);
  };

  const handleCompletedChange = async (
    checkItemId: string,
    e: CheckboxChangeEvent
  ) => {
    try {
      const { result } = await updateCheckItemApi({
        cardId: id,
        checklistId: checklist[checklistIndex].id,
        checkItemId: checkItemId,
        completed: e.target.checked,
      });

      // 更新來源資料與畫面 (可優化：API成功才更新畫面，在使用者操作後畫面會延遲變化)
      setCardData({
        ...cardData!,
        checklist: checklist.map((list) => {
          if (list.id === result.checklistId) {
            return {
              ...list,
              checkItem: list.checkItem.map((item) => {
                if (item._id === checkItemId) {
                  return result;
                }
                return item;
              }),
            };
          }
          return list;
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Progress percent={getProgressPercent()} />
      {checklist[checklistIndex].checkItem
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, completed, name }, index) => (
          <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  padding: `4px 8px`,
                  margin: `0 0 8px 0`,
                  background: (() => {
                    if (completed) {
                      return "#9F9F9F";
                    }
                    if (snapshot.isDragging) {
                      return "#83E3FF";
                    }
                    return "#D6F3FF";
                  })(),
                }}
              >
                <Checkbox
                  checked={completed}
                  onChange={(e) => {
                    handleCompletedChange(_id, e);
                  }}
                >
                  {name}
                </Checkbox>
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
};

export default CheckItems;
