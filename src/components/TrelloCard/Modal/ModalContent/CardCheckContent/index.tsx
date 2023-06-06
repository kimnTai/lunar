import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import CheckList from "./CheckList";
import { useCardModalContext } from "@/context/CardModalContext";
import {
  updateCardDiffColumn,
  updateCardInColumn,
  updateColumn,
} from "@/utils/cardFunc";

const CardCheckContent: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const onDragEnd = (result: DropResult) => {
    if (!cardData) {
      return;
    }
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
      updateColumn(result, cardData?.checklist);
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // List 中間互換
      console.log("===List 中間 互換===");
      updateCardInColumn(result, cardData?.checklist);
      return;
    }

    const data = updateCardDiffColumn(result, cardData?.checklist, "CheckList");
    setCardData({ ...cardData, checklist: data });
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
            <CheckList />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
