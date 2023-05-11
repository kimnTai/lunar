import { updateCardApi } from "@/api/cards";
import { updateListApi } from "@/api/lists";
import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DropResult } from "react-beautiful-dnd";
import { POSITION_GAP } from "./constant";
import isUndefined from "lodash/isUndefined";

export const nextPosition = (
  items: CardsProps[] | ListsProps[] | { id: string; position: string }[],
  index?: number,
  excludedId?: string
) => {
  const filteredItems = isUndefined(excludedId)
    ? items
    : items.filter((item) => item.id !== excludedId);

  if (isUndefined(index)) {
    console.log(" undefined 123");
    const lastItem = filteredItems[filteredItems.length - 1];
    return (lastItem ? Number(lastItem.position) : 0) + POSITION_GAP;
  }

  const prevItem = filteredItems[index - 1];
  const nextItem = filteredItems[index];

  const prevPosition = prevItem ? Number(prevItem.position) : 0;

  if (!nextItem) {
    console.log("no next");
    return prevPosition + POSITION_GAP;
  }
  console.log("end");
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
  updateCardApi({
    listId: source.droppableId,
    cardId: result.draggableId,
    position: useList.card[useCardIndex].position,
    closed: false,
  });
  return cardList;
};

const getColumn = (columns: ListsProps[], id: string) => {
  return columns.find((ele) => ele.id === id) || { card: [] };
};

const getNewColumn = (
  columns: ListsProps[],
  id: string,
  newArr: CardsProps[]
) => {
  let useColumn = [...columns];
  const useIndex = columns.findIndex((ele) => ele.id === id);
  if (useIndex !== -1) {
    const useArr = { ...useColumn[useIndex], card: newArr };
    useColumn.splice(useIndex, 1, useArr);
  }
  return useColumn;
};

export const updateCardDiffColumn = (
  result: DropResult,
  cardList: ListsProps[]
) => {
  const source = result.source;
  const destination = result.destination;
  const current = [...getColumn(cardList, source.droppableId).card];
  const next = [...getColumn(cardList, destination!.droppableId).card];
  const usePosition = nextPosition(next, Number(destination!.index)).toString();
  const target = current[source.index];
  target.position = usePosition;

  current.splice(source.index, 1);
  next.splice(destination!.index, 0, target);

  updateCardApi({
    listId: destination!.droppableId,
    cardId: result.draggableId,
    position: usePosition,
    closed: false,
  });

  return getNewColumn(
    getNewColumn(cardList, source.droppableId, current),
    destination!.droppableId,
    next
  );
};

export const updateColumn = (result: DropResult, cardList: ListsProps[]) => {
  const startIndex = result.source.index;
  const endIndex = result.destination!.index;
  const usePosition =
    startIndex < endIndex
      ? nextPosition(cardList, endIndex + 1).toString()
      : nextPosition(cardList, endIndex).toString();
  cardList.filter((ele) => ele.id === result.draggableId)[0].position =
    usePosition;
  updateListApi({
    listId: result.draggableId,
    position: usePosition,
    closed: false,
  });
  return cardList;
};
