import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import CheckList from "./CheckList";
import { useCardModalContext } from "@/context/CardModalContext";
import { useState } from "react";

const CardCheckContent: React.FC = () => {
  const [cardData, setCardData] = useState(useCardModalContext().cardData);
  console.log("===cardData===", cardData);
  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const source = result.source;
    const destination = result.destination;
    // 未移動
    if (
      (source.index === destination?.index &&
        source.droppableId === destination.droppableId) ||
      !destination
    ) {
      return;
    }
    // Column 互換
    if (result.type === "COLUMN") {
      console.log("===column 互換===");
      return 
    }
    if (source.droppableId === destination.droppableId) {
      // List 中間互換
      console.log("===List 中間 互換===");
      return 
    }

    // const data = updateCardDiffColumn(result, cardList);
    // setCardList(data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="vertical"
        ignoreContainerClipping={false}
        isCombineEnabled={false}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            style={{
              minHeight: "1px",
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
            }}
          >
            <CheckList checkList={cardData?.checklist} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
