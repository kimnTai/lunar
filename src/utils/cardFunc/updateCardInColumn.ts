import { updateCardApi, updateCheckItemApi } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { DropResult } from "react-beautiful-dnd";
import { ChecklistProps } from "@/interfaces/checklists";
import { nextPosition } from "./nextPosition";

export function updateCardInColumn(
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) {
  if (!result.destination) {
    return cardList;
  }
  const source = result.source;
  const destination = result.destination;
  const useList = cardList.find((ele) => ele.id === destination.droppableId);
  if (useList) {
    if (type === "Card") {
      const useCardIndex = (useList as ListsProps).card.findIndex(
        (ele) => ele.id === result.draggableId
      );
      (useList as ListsProps).card[useCardIndex].position = nextPosition(
        (useList as ListsProps).card,
        destination.index + (destination.index > useCardIndex ? 1 : 0)
      ).toString();
      updateCardApi({
        listId: source.droppableId,
        cardId: result.draggableId,
        position: (useList as ListsProps).card[useCardIndex].position,
      });
    } else {
      const useCardIndex = (useList as ChecklistProps).checkItem.findIndex(
        (ele) => ele._id === result.draggableId
      );
      (useList as ChecklistProps).checkItem[useCardIndex].position =
        nextPosition(
          (useList as ChecklistProps).checkItem,
          destination.index + (destination.index > useCardIndex ? 1 : 0)
        ).toString();
      updateCheckItemApi({
        cardId: (useList as ChecklistProps).cardId,
        checklistId: (useList as ChecklistProps).id,
        checkItemId: result.draggableId,
        position: (useList as ChecklistProps).checkItem[useCardIndex].position,
      });
    }
  }

  return cardList;
}
