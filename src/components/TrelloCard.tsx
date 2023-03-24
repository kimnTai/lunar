import React from "react";
import { TrelloCardProps, TrelloCardListProps } from "@/interfaces/trelloCard";
import styled from "styled-components";
import { Card, Button, Tooltip } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";

const TrelloCardStyled = styled(Card)<{ isdargging: string }>`
  width: 276px;

  /* transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"}; */
  .card-bottom-func {
    margin-top: 10px;
    .add-title {
      width: calc(100% - 28px);
    }
    .sample {
      width: 28px;
    }
  }
`;

export const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const { index, quotes } = props;
  const { id, title } = quotes;
  return (
    <Draggable draggableId={id} index={index}>
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

            <TrelloCardList
              {...props}
              isScrollable={false}
              listId={title}
              listType="QUOTE"
              internalScroll={props.isScrollable}
              isCombineEnabled={Boolean(props.isCombineEnabled)}
              useClone={Boolean(props.useClone)}
            />

            <div className="card-bottom-func">
              <Button type="text" icon={<PlusOutlined />} className="add-title">
                Text Button
              </Button>
              <Tooltip placement="bottom" title={"從範本建立"} arrow={false}>
                <Button
                  type="text"
                  icon={<FileTextOutlined />}
                  className="sample"
                />
              </Tooltip>
            </div>
          </TrelloCardStyled>
        </div>
      )}
    </Draggable>
  );
};

const ScrollContainer = styled.div<{ internalScroll: boolean }>`
  overflow-x: hidden;
  overflow-y: ${(props) => (props.internalScroll ? "auto" : "hidden")};
  max-height: calc(100vh - 250px);
`;
export const TrelloCardList: React.FC<TrelloCardListProps> = (props) => {
  const {
    index,
    listId = "LIST",
    listType,
    isCombineEnabled,
    useClone,
    internalScroll,
    quotes,
  } = props;
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={undefined}
      isDropDisabled={undefined}
      isCombineEnabled={isCombineEnabled}
      // renderClone={useClone ? (provided, snapshot, descriptor) => <QuoteItem quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}
      renderClone={undefined}
    >
      {(dropProvided, dropSnapshot) => (
        <div>
          <ScrollContainer internalScroll={internalScroll}>
            <div ref={dropProvided.innerRef}>
              <TrelloCardInner
                quotes={quotes}
                dropProvided={dropProvided}
                isDrag={dropSnapshot.isDraggingOver}
              />
              {dropProvided.placeholder}
            </div>
          </ScrollContainer>
        </div>
      )}
    </Droppable>
  );
};

const TrelloCardInnerStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const TrelloCardInner = React.memo(({ quotes }: any) => {
  return quotes.children.length ? (
    quotes.children.map((quote: any, index: number) => (
      <Draggable key={quote.id} draggableId={quote.id} index={index}>
        {(dragProvided, dragSnapshot) => (
          <TrelloCardInnerStyled
            // isdargging={dragSnapshot.isDragging.toString()}
            title={quote.title}
            size="small"
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            data-is-dragging={dragSnapshot.isDragging}
            data-testid={quote.id}
            data-index={index}
            aria-label={`${quote.title} quote ${quote?.context}`}
            className="trello-card-inner"
          ></TrelloCardInnerStyled>
        )}
      </Draggable>
    ))
  ) : (
    <div style={{ height: "1px" }}></div>
  );
});
