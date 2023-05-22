import { TrelloCardListProps } from "@/interfaces/trelloCard";
import { Droppable } from "react-beautiful-dnd";
import TrelloCardAdd from "./TrelloCardAdd";
import TrelloCardInner from "./TrelloCardInner";
import { ScrollContainer } from "./style";

export const TrelloCardList: React.FC<TrelloCardListProps> = (props) => {
  const {
    listType,
    isCombineEnabled,
    internalScroll,
    quotes,
    showAddCard,
    setShowAddCard,
    setOpenModal,
  } = props;
  return (
    <Droppable
      droppableId={quotes.id}
      type={listType}
      ignoreContainerClipping={undefined}
      isDropDisabled={undefined}
      isCombineEnabled={isCombineEnabled}
      // renderClone={useClone ? (provided, snapshot, descriptor) => <QuoteItem quote={quotes[descriptor.source.index]} provided={provided} isDragging={snapshot.isDragging} isClone /> : null}
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
              <TrelloCardInner
                quotes={quotes}
                dropProvided={dropProvided}
                isDrag={dropSnapshot.isDraggingOver}
                setOpenModal={setOpenModal}
              />
              <TrelloCardAdd
                list={quotes}
                showAddCard={showAddCard}
                setShowAddCard={setShowAddCard}
              />
              {dropProvided.placeholder}
            </div>
          </ScrollContainer>
        </div>
      )}
    </Droppable>
  );
};

export default TrelloCardList;
