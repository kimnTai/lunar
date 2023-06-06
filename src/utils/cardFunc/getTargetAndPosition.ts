import { DropResult } from "react-beautiful-dnd";
import { nextPosition } from "./nextPosition";

export function getTargetAndPosition<T extends PositionItem>(
  result: DropResult,
  list: T[]
) {
  if (!result.destination) {
    throw new Error("DropResult 錯誤");
  }

  const startIndex = result.source.index;
  const endIndex = result.destination.index;
  const index = endIndex + (startIndex < endIndex ? 1 : 0);

  const position = nextPosition(list, index);
  const target = list.find(({ _id }) => _id === result.draggableId);

  return { target, position };
}
