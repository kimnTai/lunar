import React, { Children, useState } from "react";
import styled from "styled-components";
import AddCard from "@/components/AddCard";
import { TrelloCard } from "@/components/TrelloCard";
import { CardProps } from "@/interfaces/trelloCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const BillboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const Billboard: React.FC<{ data: CardProps[] }> = ({ data }) => {
  const [cardList, setCardList] = useState(data);
  const onDragEndTest = (result: any) => {
    console.log(result);
    const items = [...cardList];
    const deleteItem = items.splice(result.source.index, 1);
    items.splice(result.source.index, 0, deleteItem[0]);
    setCardList(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEndTest}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={false}
      >
        {(provided) => (
          <BillboardStyled {...provided.droppableProps} ref={provided.innerRef}>
            {cardList.map((ele, index) => (
              <TrelloCard
                {...ele}
                key={index}
                index={index}
                quotes={ele.children}
                isScrollable={true}
                isCombineEnabled={false}
                useClone={undefined}
              />
            ))}
            {provided.placeholder}
          </BillboardStyled>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Billboard;
