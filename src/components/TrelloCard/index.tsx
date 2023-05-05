import React, { useState } from "react";
import {
  TrelloCardProps,
  TrelloCardListProps,
  TrelloCardInnerProps,
  CardProps,
} from "@/interfaces/trelloCard";
import { Card } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TrelloCardBottomFunc from "./TrelloCardBottomFunc";
import TrelloCardHeader from "./TrelloCardHeader";
import {
  TrelloCardStyled,
  ScrollContainer,
  TrelloCardInnerStyled,
} from "./style";
import TrelloCardAdd from "./TrelloCardAdd";
import TrelloCardModal from "./Modal";

export const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const { index, quotes } = props;
  const { id, title } = quotes;
  const [showAddCard, setShowAddCard] = useState(false);
  const [openModal, setOpenModal] = useState({
    id: "",
    open: false,
  });
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <TrelloCardStyled
              size="small"
              isdargging={snapshot.isDragging.toString()}
            >
              <Card.Meta
                title={<TrelloCardHeader title={title} />}
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
                showAddCard={showAddCard}
                setShowAddCard={setShowAddCard}
                setOpenModal={setOpenModal}
              />
              <TrelloCardBottomFunc
                showAddCard={showAddCard}
                setShowAddCard={setShowAddCard}
              />
            </TrelloCardStyled>
          </div>
        )}
      </Draggable>
      <TrelloCardModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export const TrelloCardList: React.FC<TrelloCardListProps> = (props) => {
  const {
    index,
    listId = "LIST",
    listType,
    isCombineEnabled,
    //useClone,
    internalScroll,
    quotes,
    showAddCard,
    setShowAddCard,
    setOpenModal,
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
            <div ref={dropProvided.innerRef} style={{ minHeight: "1px" }}>
              <TrelloCardInner
                quotes={quotes}
                dropProvided={dropProvided}
                isDrag={dropSnapshot.isDraggingOver}
                setOpenModal={setOpenModal}
              />
              <TrelloCardAdd
                listIndex={index}
                showAddCard={showAddCard}
                setShowAddCard={setShowAddCard}
              />
              {dropProvided.placeholder}
            </div>
          </ScrollContainer>
        </div>
      )}
    </Droppable>
  );
};

const TrelloCardInner: React.FC<TrelloCardInnerProps> = React.memo((props) => {
  const { quotes, setOpenModal } = props;
  return quotes.children.map((quote: CardProps, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <a
          onClick={() =>
            setOpenModal({
              id: quote.id,
              open: true,
            })
          }
        >
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
            aria-label={`${quote.title} quote`}
            className="trello-card-inner"
          />
        </a>
      )}
    </Draggable>
  ));
});
