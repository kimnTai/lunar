import { updateCard } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DropResult } from "react-beautiful-dnd";
import { POSITION_GAP } from "./constant";

export const nextPosition = (
  items: CardsProps[],
  index?: number,
  excludedId?: string
) => {
  const filteredItems = excludedId
    ? items
    : items.filter((item) => item.id !== excludedId);
  // is new
  if (index === undefined) {
    const lastItem = filteredItems[filteredItems.length - 1];

    return (lastItem ? parseInt(lastItem.position) : 0) + POSITION_GAP;
  }

  const prevItem = filteredItems[index - 1];
  const nextItem = filteredItems[index];

  const prevPosition = prevItem ? parseInt(prevItem.position) : 0;

  if (!nextItem) {
    return prevPosition + POSITION_GAP;
  }
  return prevPosition + (parseInt(nextItem.position) - prevPosition) / 2;
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
  useList.card[useCardIndex].position = nextPosition(
    useList.card,
    destination?.index
  ).toString();
  updateCard({
    listId: source.droppableId,
    cardId: result.draggableId,
    position: useList.card[useCardIndex].position,
    closed: false,
  });
  console.log(cardList);
  return cardList;
};
