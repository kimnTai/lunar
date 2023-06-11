import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Row } from "antd";
import { useParamCard } from "@/hooks/useParamCard";
import { handleOnDragEnd } from "@/utils/cardFunc";
import CheckLists from "./CheckLists";
import { ChecklistProps } from "@/interfaces/checklists";

const CardCheckContent: React.FC = () => {
  const cardData = useParamCard();
  // DnD 用的 list
  const [checkLists, setChecklist] = useState<ChecklistProps[]>([]);

  useEffect(() => {
    if (cardData?.checklist) {
      const cloneList = JSON.parse(JSON.stringify(cardData?.checklist));
      setChecklist(cloneList);
    }
  }, [cardData?.checklist]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!checkLists) {
          return;
        }
        const data = handleOnDragEnd(result, checkLists, "CheckList");

        if (data) {
          setChecklist(data);
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
            <CheckLists checkLists={checkLists} />
            {provided.placeholder}
          </Row>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardCheckContent;
