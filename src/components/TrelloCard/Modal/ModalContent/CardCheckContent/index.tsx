import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Row } from "antd";
import { cloneDeep } from "lodash";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { setCardChecklist } from "@/redux/boardSlice";
import { handleOnDragEnd } from "@/utils/cardFunc";
import CheckLists from "./CheckLists";

const CardCheckContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardData = useParamCard();
  // DnD 用的 checklist
  const dndChecklist = cloneDeep(cardData?.checklist || []);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const data = handleOnDragEnd(result, dndChecklist, "CheckList");
        if (data && cardData) {
          dispatch(
            setCardChecklist({
              cardId: cardData?._id,
              checklist: data,
            })
          );
        }
      }}
    >
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
            <CheckLists checkLists={dndChecklist} />
            {provided.placeholder}
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
