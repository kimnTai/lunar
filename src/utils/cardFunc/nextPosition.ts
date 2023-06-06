import { POSITION_GAP } from "../constant";
import isUndefined from "lodash/isUndefined";

export function nextPosition<T extends PositionItem>(
  items: T[],
  index?: number,
  excludedId?: string
) {
  const filteredItems = isUndefined(excludedId)
    ? items
    : items.filter((item) => item._id !== excludedId);

  if (isUndefined(index)) {
    const lastItem = filteredItems[filteredItems.length - 1];
    return (lastItem ? Number(lastItem.position) : 0) + POSITION_GAP;
  }

  const prevItem = filteredItems[index - 1];
  const nextItem = filteredItems[index];

  const prevPosition = prevItem ? Number(prevItem.position) : 0;

  if (!nextItem) {
    return prevPosition + POSITION_GAP;
  }
  return prevPosition + (Number(nextItem.position) - prevPosition) / 2;
}
