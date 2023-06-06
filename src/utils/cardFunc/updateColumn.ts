import { updateChecklistApi } from "@/api/cards";
import { updateListApi } from "@/api/lists";
import { DropResult } from "react-beautiful-dnd";
import { getTargetAndPosition } from "./getTargetAndPosition";

export function updateColumn<T extends PositionItem>(
  result: DropResult,
  list: T[]
) {
  if (!result.destination) {
    throw new Error("DropResult 錯誤");
  }

  const { target, position } = getTargetAndPosition(result, list);

  if (target) {
    updateColumnTrigger(target, position);
  }

  return list;
}

function updateColumnTrigger<T extends PositionItem>(
  target: T,
  position: number
) {
  target.position = `${position}`;

  if (
    "checkItem" in target &&
    "cardId" in target &&
    typeof target.cardId === "string"
  ) {
    updateChecklistApi({
      cardId: target.cardId,
      checklistId: target._id,
      position: target.position,
    });
  } else if ("card" in target) {
    updateListApi({
      listId: target._id,
      position: target.position,
    });
  }
}
