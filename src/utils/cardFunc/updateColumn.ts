import { updateChecklistApi } from "@/api/cards";
import { updateListApi } from "@/api/lists";
import { ListsProps } from "@/interfaces/lists";
import { DropResult } from "react-beautiful-dnd";
import { ChecklistProps } from "@/interfaces/checklists";
import { nextPosition } from "./nextPosition";

export function updateColumn(
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) {
  if (!result.destination) {
    return cardList;
  }
  const startIndex = result.source.index;
  const endIndex = result.destination.index;
  const usePosition = nextPosition(
    cardList,
    endIndex + (startIndex < endIndex ? 1 : 0)
  ).toString();

  const target = cardList.find((ele) => ele.id === result.draggableId);
  if (target) {
    target.position = usePosition;
  }
  type === "Card"
    ? updateListApi({
        listId: result.draggableId,
        position: usePosition,
      })
    : updateChecklistApi({
        cardId: (target as ChecklistProps).cardId,
        checklistId: result.draggableId,
        position: usePosition,
      });
  return cardList;
}
