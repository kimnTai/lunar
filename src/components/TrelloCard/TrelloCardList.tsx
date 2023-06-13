import { Droppable } from "react-beautiful-dnd";
import { TrelloCardListProps } from "@/interfaces/trelloCard";
import CardInner from "./CardInner";
import TrelloCardAdd from "./TrelloCardAdd";
import { ScrollContainer } from "./style";

const TrelloCardList: React.FC<TrelloCardListProps> = ({
  listType,
  isCombineEnabled,
  internalScroll,
  quotes,
}) => {
  return (
    <Droppable
      droppableId={quotes.id}
      type={listType}
      ignoreContainerClipping={undefined}
      isDropDisabled={undefined}
      isCombineEnabled={isCombineEnabled}
      renderClone={undefined}
    >
      {(dropProvided, dropSnapshot) => (
        <div>
          <ScrollContainer internalScroll={internalScroll}>
            <div
              ref={dropProvided.innerRef}
              style={{
                minHeight: "1px",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              }}
            >
              <CardInner
                lists={quotes}
                dropProvided={dropProvided}
                isDrag={dropSnapshot.isDraggingOver}
              />
              <TrelloCardAdd list={quotes} />
              {dropProvided.placeholder}
            </div>
          </ScrollContainer>
        </div>
      )}
    </Droppable>
  );
};

export default TrelloCardList;
