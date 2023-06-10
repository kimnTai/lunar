import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Progress } from "antd";
import { CheckItemProps } from "@/interfaces/checklists";
import CheckItem from "./CheckItem";
import { CheckItemsStyled } from "./CheckListStyle";

const CheckItems: React.FC<{
  itemsData: CheckItemProps[];
}> = ({ itemsData }) => {
  const getProgressPercent = () => {
    const itemsTotal = itemsData.length;
    const itemsCompleted = itemsData.filter((item) => item.completed).length;

    return Math.round((itemsCompleted / itemsTotal) * 100);
  };

  return (
    <CheckItemsStyled>
      <Progress percent={getProgressPercent()} />
      {itemsData
        .sort((a, b) => +a.position - +b.position)
        .map((item, index) => (
          <Draggable key={item._id} draggableId={item._id} index={index}>
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
                    if (item.completed) {
                      return "#9F9F9F";
                    }
                    if (snapshot.isDragging) {
                      return "#83E3FF";
                    }
                    return "#D6F3FF";
                  })(),
                }}
              >
                <CheckItem itemData={item} />
              </div>
            )}
          </Draggable>
        ))}
    </CheckItemsStyled>
  );
};

export default CheckItems;
