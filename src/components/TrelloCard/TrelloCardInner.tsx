import { TrelloCardInnerProps } from "@/interfaces/trelloCard";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TrelloCardInnerStyled } from "./style";

const TrelloCardInner: React.FC<TrelloCardInnerProps> = React.memo((props) => {
  const { quotes, setOpenModal } = props;

  return (
    <>
      {quotes.card
        .sort((a, b) => +a.position - +b.position)
        .map(({ id, name, attachment }, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(dragProvided, dragSnapshot) => (
              <a
                onClick={() =>
                  setOpenModal({
                    id: id,
                    open: true,
                  })
                }
              >
                <TrelloCardInnerStyled
                  title={name}
                  size="small"
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                  data-is-dragging={dragSnapshot.isDragging}
                  data-index={index}
                  aria-label={`${name} quote`}
                  className="trello-card-inner"
                  cover={
                    <img
                      src={attachment.at(0)?.dirname}
                      style={{
                        height: attachment.at(0) ? 133 : 0,
                        objectFit: "cover",
                      }}
                    />
                  }
                />
              </a>
            )}
          </Draggable>
        ))}
    </>
  );
});

export default TrelloCardInner;
