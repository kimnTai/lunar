import React from "react";
import { TrelloCardProps, CardProps } from "@/interfaces/trelloCard";
import styled from "styled-components";
import { Card } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TrelloCardStyled = styled(Card)<{ isdargging: string }>`
  width: 276px;
  transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"};
`;

export const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const { title, id, children, isDragging } = props;
  return (
    <TrelloCardStyled
      size="small"
      title={title}
      extra={<a href="#">More</a>}
      isdargging={isDragging.toString()}
    >
      <Droppable droppableId="droppableId">
        {(provided) => (
          <>
            {children &&
              children.map((ele, idx) => (
                <TrelloInsideCard {...ele} key={idx} index={idx} />
              ))}
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </TrelloCardStyled>
  );
};

const TrelloInsideCardStyled = styled(Card)<{ isdargging: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"};
`;
export const TrelloInsideCard: React.FC<CardProps> = (props) => {
  const { title, id, index } = props;

  return (
    <Draggable draggableId={id} index={index!}>
      {(provided, snapshot) => (
        <TrelloInsideCardStyled
          size="small"
          title={title}
          extra={<a href="#">More</a>}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isdargging={snapshot.isDragging.toString()}
        >
          {id}
        </TrelloInsideCardStyled>
      )}
    </Draggable>
  );
};
