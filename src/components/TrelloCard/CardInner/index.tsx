import React from "react";
import { Card } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { TrelloCardInnerProps } from "@/interfaces/trelloCard";
import CardInnerChecklist from "./CardInnerChecklist";
import CardInnerDate from "./CardInnerDate";
import CardInnerIcon from "./CardInnerIcon";
import CardInnerLabel from "./CardInnerLabel";
import CardInnerMember from "./CardInnerMember";
import CardInnerTitle from "./CardInnerTitle";
import { useNavigate } from "react-router";

const TrelloCardInner: React.FC<TrelloCardInnerProps> = ({ lists }) => {
  const navigate = useNavigate();

  return (
    <>
      {lists.card
        .sort((a, b) => +a.position - +b.position)
        .map(
          (
            {
              id,
              name,
              attachment,
              label,
              checklist,
              date,
              member,
              comment,
              boardId,
            },
            index
          ) => (
            <Draggable key={id} draggableId={id} index={index}>
              {(dragProvided, dragSnapshot) => (
                <div
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                  ref={dragProvided.innerRef}
                  data-is-dragging={dragSnapshot.isDragging}
                  data-index={index}
                  aria-label={`${name} quote`}
                >
                  <Card
                    size="small"
                    className="trello-card-inner"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "5px",
                    }}
                    cover={
                      <img
                        src={attachment?.length ? attachment[0].dirname : ""}
                        style={{
                          height: attachment?.length ? 133 : 0,
                          objectFit: "cover",
                        }}
                      />
                    }
                    onClick={() => {
                      navigate(`/board/${boardId}/cards/${id}`);
                    }}
                  >
                    <CardInnerTitle name={name} />
                    <CardInnerLabel label={label} />
                    <CardInnerChecklist checklist={checklist} />
                    <CardInnerIcon
                      commentLength={comment.length}
                      attachmentLength={attachment.length}
                      checklist={checklist}
                    />
                    <div className="d-space" style={{ padding: "0 8px" }}>
                      <CardInnerDate date={date} />
                      <CardInnerMember member={member} />
                    </div>
                  </Card>
                </div>
              )}
            </Draggable>
          )
        )}
    </>
  );
};

export default React.memo(TrelloCardInner);
