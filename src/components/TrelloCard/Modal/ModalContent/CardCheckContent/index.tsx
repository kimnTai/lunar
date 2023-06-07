import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import CheckList from "./CheckList";
import { useCardModalContext } from "@/context/CardModalContext";
import { handleOnDragEnd } from "@/utils/cardFunc";

const CardCheckContent: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const onDragEnd = (result: DropResult) => {
    if (!cardData) {
      return;
    }
    const data = handleOnDragEnd(result, cardData?.checklist, "CheckList");

    if (data) {
      setCardData({ ...cardData, checklist: data });
    }
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
