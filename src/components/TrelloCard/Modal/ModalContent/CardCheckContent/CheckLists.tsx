import { Draggable, Droppable } from "react-beautiful-dnd";
import { ChecklistProps } from "@/interfaces/checklists";
import CheckList from "./CheckList";

const CheckLists: React.FC<{ checkLists: ChecklistProps[] }> = ({
  checkLists,
}) => {
  return (
    <>
      {checkLists
        .sort((a, b) => +a.position - +b.position)
        .map((list, index) => (
          <Draggable key={list._id} draggableId={list._id} index={index}>
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <Droppable
                  droppableId={list._id}
                  type={"QUOTE"}
                  ignoreContainerClipping={undefined}
                  isDropDisabled={undefined}
                  isCombineEnabled={false}
                  renderClone={undefined}
                >
                  {(dropProvided, _dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      style={{ minHeight: "1px" }}
                    >
                      <CheckList listData={list} />
                      {dropProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
};

export default CheckLists;
