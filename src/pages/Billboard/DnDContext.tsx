import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "@/components/AddList";
import TrelloCard from "@/components/TrelloCard";
import { useAppSelector } from "@/hooks";
import useWebSocket from "@/hooks/useWebSocket";
import { ListsProps } from "@/interfaces/lists";
import { selectBoard } from "@/redux/boardSlice";
import { getSocketChange, handleOnDragEnd } from "@/utils/cardFunc";
import { BillboardStyled } from "./style";

const DnDContext: React.FC = () => {
  const board = useAppSelector(selectBoard);
  const [cardList, setCardList] = useState<ListsProps[]>([]);

  const { data: socketEvent, sendMessage } = useWebSocket(
    board._id,
    async (_: string) => {}
  );

  useEffect(() => {
    if (socketEvent) {
      setCardList(getSocketChange(cardList, socketEvent));
    }
  }, [socketEvent]);

  useEffect(() => {
    if (board.list) {
      const cloneList = JSON.parse(JSON.stringify(board.list));
      setCardList(cloneList);
      sendMessage({ type: "subscribe", boardId: board._id });
    }
    return () => sendMessage({ type: "unsubscribe", boardId: board._id });
  }, [board.list]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const resultList = handleOnDragEnd(result, cardList);
        if (resultList) {
          setCardList(resultList);
        }
      }}
    >
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={false}
      >
        {(provided) => (
          <BillboardStyled {...provided.droppableProps} ref={provided.innerRef}>
            {cardList
              .sort((a, b) => +a.position - +b.position)
              .map((ele, index) => (
                <TrelloCard
                  key={ele.id}
                  index={index}
                  quotes={ele}
                  isScrollable={true}
                  isCombineEnabled={false}
                  useClone={undefined}
                />
              ))}
            {provided.placeholder}
            <AddList />
          </BillboardStyled>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DnDContext;
