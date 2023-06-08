import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import AddList from "@/components/AddList";
import TrelloCard from "@/components/TrelloCard";
import { ListsProps } from "@/interfaces/lists";
import { UrlCardShareProps } from "@/interfaces/trelloCard";
import { handleOnDragEnd } from "@/utils/cardFunc";
import { BillboardStyled } from "./style";

const DnDContext: React.FC<{
  cardList: ListsProps[];
  setCardList: React.Dispatch<React.SetStateAction<ListsProps[]>>;
  setOpenModal: React.Dispatch<React.SetStateAction<UrlCardShareProps>>;
}> = ({ cardList, setCardList, setOpenModal }) => {
  const onDragEnd = (result: DropResult) => {
    const resultList = handleOnDragEnd(result, cardList);
    if (resultList) {
      setCardList(resultList);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                  setOpenModal={setOpenModal}
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
