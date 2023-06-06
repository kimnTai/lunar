import { updateCardApi, updateCheckItemApi } from "@/api/cards";
import { DropResult } from "react-beautiful-dnd";
import { getTargetAndPosition } from "./getTargetAndPosition";
import { CardsProps } from "@/interfaces/cards";
import { CheckItemProps } from "@/interfaces/checklists";

export function updateCardInColumn<T extends PositionItem>(
  result: DropResult,
  list: T[]
) {
  if (!result.destination) {
    return list;
  }

  const useList = list.find(
    ({ _id }) => _id === result.destination?.droppableId
  );

  if (useList && "card" in useList && Array.isArray(useList.card)) {
    const { target, position } = getTargetAndPosition<CardsProps>(
      result,
      useList.card
    );

    if (target) {
      target.position = `${position}`;
      updateCardApi({
        cardId: target._id,
        position: target.position,
      });
    }
  }

  if (
    useList &&
    "cardId" in useList &&
    typeof useList.cardId === "string" &&
    "checkItem" in useList &&
    Array.isArray(useList.checkItem)
  ) {
    const { target, position } = getTargetAndPosition<CheckItemProps>(
      result,
      useList.checkItem
    );

    if (target) {
      target.position = `${position}`;
      updateCheckItemApi({
        cardId: useList.cardId,
        checklistId: target.checklistId,
        checkItemId: target._id,
        position: target.position,
      });
    }
  }

  return list;
}
