import React, { useState } from "react";
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
      <Droppable droppableId="droppableId" direction="horizontal">
        {(provided) => (
          <BillboardStyled {...provided.droppableProps} ref={provided.innerRef}>
            {cardList.map((ele, index) => {
              return (
                <Draggable key={ele.id} draggableId={ele.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TrelloCard
                          {...ele}
                          key={index}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </BillboardStyled>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Billboard;
