import { TrelloCardInnerProps } from "@/interfaces/trelloCard";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TrelloCardInnerStyled } from "./style";

const TrelloCardInner: React.FC<TrelloCardInnerProps> = React.memo((props) => {
  const { quotes, setOpenModal } = props;

  return (
    <>
      {quotes.card
        .sort((a, b) => Number(a.position) - Number(b.position))
        .map((quote, index) => (
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
                  title={quote.name}
                  size="small"
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                  data-is-dragging={dragSnapshot.isDragging}
                  data-testid={quote.id}
                  data-index={index}
                  aria-label={`${quote.name} quote`}
                  className="trello-card-inner"
                />
              </a>
            )}
          </Draggable>
        ))}
    </>
  );
});

export default TrelloCardInner;
