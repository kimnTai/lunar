import { updateCard } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DropResult } from "react-beautiful-dnd";
import { POSITION_GAP } from "./constant";
import isUndefined from "lodash/isUndefined";

export const nextPosition = (
  items: CardsProps[],
  index?: number,
  excludedId?: string
) => {
  const filteredItems = isUndefined(excludedId)
    ? items
    : items.filter((item) => item.id !== excludedId);

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
};

export const updateCardInColumn = (
  result: DropResult,
  cardList: ListsProps[]
) => {
  const source = result.source;
  const destination = result.destination;
  const useList = cardList.filter(
    (ele) => ele.id === destination?.droppableId
  )[0];
  const useCardIndex = useList.card.findIndex(
    (ele) => ele.id === result.draggableId
  );
  useList.card[useCardIndex].position =
    destination!.index > useCardIndex
      ? nextPosition(useList.card, Number(destination?.index) + 1).toString()
      : nextPosition(useList.card, destination?.index).toString();
  updateCard({
    listId: source.droppableId,
    cardId: result.draggableId,
    position: useList.card[useCardIndex].position,
    closed: false,
  });
  return cardList;
};
