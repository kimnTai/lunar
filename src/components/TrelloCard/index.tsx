import React, { useState } from "react";
import { TrelloCardProps } from "@/interfaces/trelloCard";
import { Card } from "antd";
import { Draggable } from "react-beautiful-dnd";
import TrelloCardBottomFunc from "./TrelloCardBottomFunc";
import TrelloCardHeader from "./TrelloCardHeader";
import { TrelloCardStyled } from "./style";
import TrelloCardModal from "./Modal";
import { CardModalProvider } from "@/context/CardModalContext";
import { TrelloCardList } from "./TrelloCardList";

export const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const {
    index,
    quotes: { id, name },
  } = props;

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
              isdragging={snapshot.isDragging.toString()}
            >
              <Card.Meta
                title={<TrelloCardHeader title={name} />}
                className="cardTitle"
                {...provided.dragHandleProps}
                aria-label={`${name} quote list`}
                style={{ marginBottom: "8px" }}
              />

              <TrelloCardList
                {...props}
                isScrollable={false}
                listId={name}
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
      <CardModalProvider>
        <TrelloCardModal openModal={openModal} setOpenModal={setOpenModal} />
      </CardModalProvider>
    </>
  );
};
