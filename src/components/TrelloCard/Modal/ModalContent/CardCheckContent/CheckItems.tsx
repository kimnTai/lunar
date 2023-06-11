import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Col, Progress, Row } from "antd";
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
              <Row
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  background: (() => {
                    if (item.completed) {
                      return "#E9E9E9";
                    }
                    if (snapshot.isDragging) {
                      return "#83E3FF";
                    }
                    return "#D6F3FF";
                  })(),
                }}
              >
                <Col span={24}>
                  <CheckItem itemData={item} />
                </Col>
              </Row>
            )}
          </Draggable>
        ))}
    </CheckItemsStyled>
  );
};

export default CheckItems;
