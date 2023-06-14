import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "antd";
import { ListsProvider } from "@/context/ListsContext";
import { TrelloCardProps } from "@/interfaces/trelloCard";
import ListsHeader from "./ListsHeader";
import TrelloCardBottomFunc from "./TrelloCardBottomFunc";
import TrelloCardList from "./TrelloCardList";
import { TrelloCardStyled } from "./style";

const TrelloCard: React.FC<TrelloCardProps> = (props) => {
  const index = props.index;
  const listId = props.quotes.id;
  const listName = props.quotes.name;

  return (
    <ListsProvider>
      <Draggable draggableId={listId} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <TrelloCardStyled
              size="small"
              isdragging={snapshot.isDragging.toString()}
            >
              <Card.Meta
                title={<ListsHeader listId={listId} />}
                className="cardTitle"
                {...provided.dragHandleProps}
                aria-label={`${listName} quote list`}
                style={{ marginBottom: "8px" }}
              />
              <TrelloCardList
                {...props}
                isScrollable={false}
                listId={listId}
                listType="QUOTE"
                internalScroll={props.isScrollable}
                isCombineEnabled={props.isCombineEnabled}
                useClone={props.useClone}
              />
              <TrelloCardBottomFunc />
            </TrelloCardStyled>
          </div>
        )}
      </Draggable>
    </ListsProvider>
  );
};

export default TrelloCard;
