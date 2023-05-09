import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { CardProps } from "@/interfaces/trelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { reorder, reorderQuoteMap } from "@/utils/func";
import { BillboardStyled } from "./style";
import BillboardHeader from "./BillboardHeader";
import { useParams } from "react-router";
import { useApi } from "@/hooks/useApiHook";
import { getBoardApi } from "@/api/boards";
import { Spin } from "antd";

const Billboard: React.FC<{
  data: CardProps[];
  workSpace: boolean;
  setWorkSpace: Function;
}> = ({ data, workSpace, setWorkSpace }) => {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [ordered, setOrdered] = useState<string[]>([]);
  const { boardId } = useParams();
  const [result, loading, callApi] = useApi(getBoardApi);
  // useEffect(() => {
  //   if (data) {
  //     setCardList(data);
  //     setOrdered(data.map((ele) => ele.title));
  //   }
  // }, [data]);
  useEffect(() => {
    if (result?.result) {
      setCardList(result.result.list);
    }
  }, [result?.result]);
  useEffect(() => {
    if (boardId) {
      (async () => {
        await callApi(boardId);
      })();
    }
  }, [boardId]);
  useEffect(() => {
    if (workSpace) {
      setWorkSpace(false);
    }
  }, [workSpace]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (result.type === "COLUMN") {
      console.log("in COLUMN");
      const reorderedOrder = reorder(ordered, source.index, destination.index);
      setOrdered(reorderedOrder);
      return;
    }

    const data = reorderQuoteMap(cardList, source, destination);
    setCardList(data);
  };
  console.log("===result===", result);
  console.log("===cardList===", cardList);
  console.log("===data===", data);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <BillboardHeader name={""} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="board"
              type="COLUMN"
              direction="horizontal"
              ignoreContainerClipping={false}
              isCombineEnabled={false}
            >
              {(provided) => (
                <BillboardStyled
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {ordered.map((key, index) => (
                    <TrelloCard
                      key={key}
                      index={index}
                      quotes={cardList.filter((ele) => ele.title === key)[0]}
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
        </>
      )}
    </>
  );
};

export default Billboard;
