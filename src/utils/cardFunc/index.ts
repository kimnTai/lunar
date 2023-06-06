import { DropResult } from "react-beautiful-dnd";
import { getSocketChange } from "./getSocketChange";
import { nextPosition } from "./nextPosition";
import { updateCardDiffColumn } from "./updateCardDiffColumn";
import { updateCardInColumn } from "./updateCardInColumn";
import { updateColumn } from "./updateColumn";
import { ListsProps } from "@/interfaces/lists";
import { ChecklistProps } from "@/interfaces/checklists";

export function handleOnDragEnd(
  result: DropResult,
  list: ListsProps[]
): ListsProps[];
export function handleOnDragEnd(
  result: DropResult,
  list: ChecklistProps[],
  type: "CheckList"
): ChecklistProps[];
export function handleOnDragEnd<T extends ChecklistProps | ListsProps>(
  result: DropResult,
  list: T[],
  type: "Card" | "CheckList" = "Card"
) {
  if (!result.destination) {
    return;
  }

  const startId = result.source.droppableId;
  const startIndex = result.source.index;
  const endId = result.destination.droppableId;
  const endIndex = result.destination.index;

  // 未移動
  if (startIndex === endIndex && startId === endId) {
    return;
  }
  // Column 互換
  if (result.type === "COLUMN") {
    return updateColumn(result, list);
  }

  // List 中間互換
  if (startId === endId) {
    return updateCardInColumn(result, list);
  }

  // card 移動到新的 list
  if (type === "CheckList") {
    const _list = list as unknown as ChecklistProps[];
    return updateCardDiffColumn(result, _list, type) as ChecklistProps[];
  } else {
    const _list = list as unknown as ListsProps[];
    return updateCardDiffColumn(result, _list) as ListsProps[];
  }
}

export { nextPosition, getSocketChange };
