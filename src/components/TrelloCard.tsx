import React from "react";
import { TrelloCardProps, TrelloInsideCardProps } from "@/interfaces/trelloCard";
import styled from "styled-components";
import { Card } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TrelloCardStyled = styled(Card)<{ isdargging: string }>`
  width: 276px;

  /* transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"}; */
`;

export const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const { title, id, children, index,quotes } = props;
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <TrelloCardStyled
            size="small"
            isdargging={snapshot.isDragging.toString()}
          >
            <Card.Meta
              title={title}
              className="cardTitle"
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            />
            <>
              {children &&
                children.map((ele, idx) => (
                  <TrelloInsideCard {...ele} key={idx} index={idx}
                  listId={title}
                  listType="QUOTE"
                  quotes={quotes}
                  internalScroll={props.isScrollable}
                  isCombineEnabled={Boolean(props.isCombineEnabled)}
                  useClone={Boolean(props.useClone)}
                  />
                ))}
            </>
          </TrelloCardStyled>
        </div>
      )}
    </Draggable>
  );
};

const TrelloInsideCardStyled = styled(Card)<{ isdargging: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"};
`;
export const TrelloInsideCard: React.FC<TrelloInsideCardProps> = (props) => {
  const { title, id, index,listId ,listType,ignoreContainerClipping} = props;

  return (
    <Droppable droppableId={listId} type={listType} ignoreContainerClipping={ignoreContainerClipping} isDropDisabled={isDropDisabled} isCombineEnabled={isCombineEnabled} renderClone={useClone ? (provided, snapshot, descriptor) => <QuoteItem quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}>
      {(dropProvided, dropSnapshot) => (
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
