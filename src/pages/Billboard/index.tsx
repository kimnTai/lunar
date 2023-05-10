import React, { useState, useEffect } from "react";
import AddList from "@/components/AddList";
import { TrelloCard } from "@/components/TrelloCard";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { BillboardStyled } from "./style";
import BillboardHeader from "./BillboardHeader";
import { useParams } from "react-router";
import { useApi } from "@/hooks/useApiHook";
import { getBoardApi } from "@/api/boards";
import { Spin } from "antd";
import { ListsProps } from "@/interfaces/lists";
import { updateCardInColumn } from "@/utils/cardFunc";

const Billboard: React.FC<{
  workSpace: boolean;
  setWorkSpace: Function;
}> = ({ workSpace, setWorkSpace }) => {
  const [cardList, setCardList] = useState<ListsProps[]>([]);
  const [ordered, setOrdered] = useState<ListsProps[]>([]);
  const { boardId } = useParams();
  const [result, loading, callApi] = useApi(getBoardApi);

  useEffect(() => {
    if (result?.result) {
      setCardList(result.result.list);
      setOrdered(
        result.result.list.sort(
          (a: any, b: any) => parseInt(a.position) - parseInt(b.position)
        )
      );
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
    const source = result.source;
    const destination = result.destination;

    if (source.index === destination?.index) {
      return;
    }

    if (source.droppableId === destination?.droppableId) {
      console.log("in COLUMN");
      const data = updateCardInColumn(result, cardList);
      setCardList(data);
      return;
    }

    // setCardList(data);
  };

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
                  {ordered.map((ele, index) => (
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
        </>
      )}
    </>
  );
};

export default Billboard;
