import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Row } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { handleOnDragEnd } from "@/utils/cardFunc";
import CheckLists from "./CheckLists";

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
          <Row
            ref={provided.innerRef}
            gutter={8}
            style={{
              minHeight: "1px",
              flexDirection: "column",
            }}
          >
            <CheckLists />
            {provided.placeholder}
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
