import { TrelloCardInnerProps } from "@/interfaces/trelloCard";
import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TrelloCardInnerStyled } from "./style";
import {
  CheckSquareOutlined,
  AlignLeftOutlined,
  MessageOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import CardInnerDate from "./CardInnerDate";

const TrelloCardInner: React.FC<TrelloCardInnerProps> = React.memo((props) => {
  const { quotes, setOpenModal } = props;
  const [totalCheckItem, setTotalCheckItem] = useState<number>(0);
  const [finishCheckItem, setFinishCheckItem] = useState<number>(0);
  const quote = quotes.card;

  useEffect(() => {
    quote.map((ele) => {
      let totalNum = 0;
      let doneNum = 0;
      ele.checklist.map((ele) => {
        const total = ele.checkItem.filter((ele) => ele.completed === false);
        totalNum += total.length;
        const done = ele.checkItem.filter((ele) => ele.completed === true);
        doneNum += done.length;
      });
      setTotalCheckItem(totalNum);
      setFinishCheckItem(doneNum);
    });
  }, [quotes]);

  return (
    <>
      {quotes.card
        .sort((a, b) => +a.position - +b.position)
        .map(
          (
            { id, name, attachment, label, checklist, date, member, comment },
            index
          ) => (
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
                        src={attachment?.length ? attachment[0].dirname : ""}
                        style={{
                          height: attachment?.length ? 133 : 0,
                          objectFit: "cover",
                        }}
                      />
                    }
                  >
                    <div>
                      <div
                        style={{
                          width: "256px",
                          height: "21px",
                          fontSize: "14px",
                          fontWeight: "700",
                          lineHeight: "150%",
                          padding: "0 12px",
                        }}
                      >
                        {name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "7px",
                          marginTop: "5px",
                        }}
                      >
                        {label.map((ele) => (
                          <div
                            key={ele._id}
                            style={{
                              backgroundColor: `${ele.color}`,
                              width: "24px",
                              height: "8px",
                              borderRadius: "3px",
                              marginLeft: "5px",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    {checklist.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          padding: "0 12px",
                          marginTop: "8px",
                        }}
                      >
                        <div>
                          <CheckSquareOutlined />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "235px",
                            overflow: "hidden",
                          }}
                        >
                          {checklist.map((ele, _id) => {
                            let str = "";
                            str += ele.name + "、";

                            return (
                              <p
                                key={ele._id}
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  marginLeft: "5px",
                                }}
                              >
                                {str}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "160px",
                        padding: "0 8px",
                        marginTop: "6px",
                      }}
                    >
                      <div>
                        <AlignLeftOutlined />
                      </div>
                      <div style={{ display: "flex" }}>
                        <div>
                          <MessageOutlined />
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                          {comment.length}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div>
                          <PaperClipOutlined />
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                          {attachment.length}
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div>
                          <CheckSquareOutlined />
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                          {finishCheckItem}/{totalCheckItem}
                        </div>
                      </div>
                    </div>
                    <CardInnerDate date={date} />
                    {member.map((ele) => (
                      <Avatar.Group
                        key={ele.userId._id}
                        style={{
                          marginTop: "6px",
                          position: "relative",
                        }}
                      >
                        <Avatar
                          src={ele.userId.avatar}
                          style={{
                            marginRight: "-10px",
                            left: "10px",
                          }}
                        />
                      </Avatar.Group>
                    ))}
                  </TrelloCardInnerStyled>
                </a>
              )}
            </Draggable>
          )
        )}
    </>
  );
});

export default TrelloCardInner;
