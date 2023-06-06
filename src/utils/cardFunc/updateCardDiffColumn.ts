import { updateCardApi, updateCheckItemApi } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { DropResult } from "react-beautiful-dnd";
import { ChecklistProps } from "@/interfaces/checklists";
import { nextPosition } from "./nextPosition";

export function updateCardDiffColumn(
  result: DropResult,
  list: ListsProps[]
): ListsProps[];
export function updateCardDiffColumn(
  result: DropResult,
  list: ChecklistProps[],
  type: "CheckList"
): ChecklistProps[];
// TODO:型別先用斷言跟重載來推
export function updateCardDiffColumn(
  result: DropResult,
  list: (ListsProps | ChecklistProps)[],
  type: "Card" | "CheckList" = "Card"
) {
  if (!result.destination) {
    throw new Error("DropResult 錯誤");
  }

  if (type === "Card") {
    const _list = list as ListsProps[];
    const { target, position, newList, newId } = getCommonDiffColumnInfo(
      result,
      _list,
      "card"
    );

    target.position = `${position}`;

    updateCardApi({
      listId: newId,
      cardId: target._id,
      position: `${position}`,
    });

    return newList;
  } else {
    const _list = list as ChecklistProps[];
    const { target, position, newList, newId } = getCommonDiffColumnInfo(
      result,
      _list,
      "checkItem"
    );

    target.position = `${position}`;

    const startId = result.source.droppableId;
    updateCheckItemApi({
      cardId: _list.find(({ _id }) => _id === newId)!.cardId,
      checkItemId: target._id,
      checklistIdOld: startId,
      checklistId: newId,
      position: `${position}`,
    });

    return newList;
  }
}

function getCommonDiffColumnInfo<T extends PositionItem, K extends keyof T>(
  result: DropResult,
  list: T[],
  key: K
) {
  if (!result.destination) {
    throw new Error("DropResult 錯誤");
  }
  const startId = result.source.droppableId;
  const startIndex = result.source.index;

  const endId = result.destination.droppableId;
  const endIndex = result.destination.index;

  // TODO:型別先用斷言來推
  const [current, next] = [startId, endId].map((id) =>
    list
      .filter(({ _id }) => _id === id)
      .flatMap((item) => item[key] as PositionItem[])
  );

  const position = nextPosition(next, endIndex);

  const target = current[startIndex];

  current.splice(startIndex, 1);
  next.splice(endIndex, 0, target);

  const newList = list.map((value) => {
    if (value._id === startId) {
      return { ...value, [key]: current };
    }
    if (value._id === endId) {
      return { ...value, [key]: next };
    }
    return value;
  });

  return {
    target,
    position,
    newList,
    newId: endId,
  };
}
