import { Draggable, Droppable } from "react-beautiful-dnd";
import { SectionHeaderStyled } from "../style";
import { Col } from "antd";
import CheckItem from "./CheckItem";
import { ChecklistProps } from "@/interfaces/checklists";

const CheckList: React.FC<{ checkList?: ChecklistProps[] }> = ({
  checkList = [],
}) => {
  return (
    <>
      {checkList
        .sort((a, b) => +a.position - +b.position)
        .map(({ _id, name, checkItem }, index) => (
          <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <SectionHeaderStyled align="middle" gutter={8}>
                  <Col flex="none">
                    <h3>{name}</h3>
                  </Col>
                </SectionHeaderStyled>

                <Droppable
                  droppableId={_id}
                  type={"QUOTE"}
                  ignoreContainerClipping={undefined}
                  isDropDisabled={undefined}
                  isCombineEnabled={false}
                  // renderClone={useClone ? (provided, snapshot, descriptor) => <QuoteItem quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}
                  renderClone={undefined}
                >
                  {(dropProvided, dropSnapshot) => (
                    <div
                      ref={dropProvided.innerRef}
                      style={{ minHeight: "1px" }}
                    >
                      <CheckItem checkItem={checkItem} />
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

export default CheckList;
