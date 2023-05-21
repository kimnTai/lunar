import React from "react";
import { Checkbox } from "antd";
import { CheckItemProps } from "@/interfaces/checklists";
import { Draggable } from "react-beautiful-dnd";

const CheckItem: React.FC<{ checkItem?: CheckItemProps[] }> = ({
  checkItem = [],
}) => {
  return (
    <>
      {checkItem
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, completed, name }, index) => (
          <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided?.draggableProps?.style,
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
                <Checkbox checked={completed}>{name}</Checkbox>
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
};

export default CheckItem;
