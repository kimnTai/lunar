import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CheckList from "./CheckList";
import { useCardModalContext } from "@/context/CardModalContext";

const CardCheckContent: React.FC = () => {
  const { cardData } = useCardModalContext();

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId={cardData?._id || ""}>
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
            {<CheckList checkList={cardData?.checklist} />}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
