import {
  updateCardApi,
  updateCheckItemApi,
  updateChecklistApi,
} from "@/api/cards";
import { updateListApi } from "@/api/lists";
import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DropResult } from "react-beautiful-dnd";
import { POSITION_GAP } from "./constant";
import isUndefined from "lodash/isUndefined";
import { CheckItemProps, ChecklistProps } from "@/interfaces/checklists";
import { SocketResultProps } from "@/interfaces/socket";

export const nextPosition = <T extends { _id: string; position: string }>(
  items: T[],
  index?: number,
  excludedId?: string
) => {
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
};

export const updateCardInColumn = (
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) => {
  if (!result.destination) {
    return cardList;
  }
  const source = result.source;
  const destination = result.destination;
  const useList = cardList.find((ele) => ele.id === destination.droppableId);
  if (useList) {
    if (type === "Card") {
      const useCardIndex = (useList as ListsProps).card.findIndex(
        (ele) => ele.id === result.draggableId
      );
      (useList as ListsProps).card[useCardIndex].position = nextPosition(
        (useList as ListsProps).card,
        destination.index + (destination.index > useCardIndex ? 1 : 0)
      ).toString();
      updateCardApi({
        listId: source.droppableId,
        cardId: result.draggableId,
        position: (useList as ListsProps).card[useCardIndex].position,
      });
    } else {
      const useCardIndex = (useList as ChecklistProps).checkItem.findIndex(
        (ele) => ele._id === result.draggableId
      );
      (useList as ChecklistProps).checkItem[useCardIndex].position =
        nextPosition(
          (useList as ChecklistProps).checkItem,
          destination.index + (destination.index > useCardIndex ? 1 : 0)
        ).toString();
      updateCheckItemApi({
        cardId: (useList as ChecklistProps).cardId,
        checklistId: (useList as ChecklistProps).id,
        checkItemId: result.draggableId,
        position: (useList as ChecklistProps).checkItem[useCardIndex].position,
      });
    }
  }

  return cardList;
};

export const getColumn = (
  columns: (ListsProps | ChecklistProps)[],
  id: string,
  type = "Card"
) => {
  return type === "Card"
    ? columns.find((ele) => ele.id === id) || { card: [] }
    : columns.find((ele) => ele.id === id) || { checkItem: [] };
};

const getNewColumn = (
  columns: (ListsProps | ChecklistProps)[],
  id: string,
  newArr: (CardsProps | CheckItemProps)[],
  type = "Card"
) => {
  const useColumn = [...columns];
  const useIndex = columns.findIndex((ele) => ele.id === id);

  if (useIndex !== -1) {
    const useArr =
      type === "Card"
        ? { ...useColumn[useIndex], card: newArr }
        : { ...useColumn[useIndex], checkItem: newArr };
    useColumn.splice(useIndex, 1, useArr as any);
  }
  return useColumn;
};

export const updateCardDiffColumn = (
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) => {
  if (!result.destination) {
    return cardList;
  }

  const source = result.source;
  const destination = result.destination;

  const current =
    type === "Card"
      ? [...(getColumn(cardList, source.droppableId) as ListsProps).card]
      : [
          ...(
            getColumn(
              cardList,
              source.droppableId,
              "CheckList"
            ) as ChecklistProps
          ).checkItem,
        ];
  const next =
    type === "Card"
      ? [...(getColumn(cardList, destination.droppableId) as ListsProps).card]
      : [
          ...(
            getColumn(
              cardList,
              destination.droppableId,
              "CheckList"
            ) as ChecklistProps
          ).checkItem,
        ];

  const usePosition =
    type === "Card"
      ? nextPosition(next as CardsProps[], destination.index).toString()
      : nextPosition(next as CheckItemProps[], destination.index).toString();

  const target = current[source.index];
  target.position = usePosition;

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target as any);
  type === "Card"
    ? updateCardApi({
        listId: destination.droppableId,
        cardId: result.draggableId,
        position: usePosition,
      })
    : updateCheckItemApi({
        checkItemId: result.draggableId,
        cardId: (cardList as ChecklistProps[]).find(
          (ele) => ele.id === destination.droppableId
        )!.cardId,
        checklistId: (cardList as ChecklistProps[]).find(
          (ele) => ele.id === destination.droppableId
        )!.id,
        checklistIdOld: (cardList as ChecklistProps[]).find(
          (ele) => ele.id === source.droppableId
        )!.id,
        position: usePosition,
      });

  return type === "Card"
    ? getNewColumn(
        getNewColumn(cardList, source.droppableId, current),
        destination.droppableId,
        next
      )
    : getNewColumn(
        getNewColumn(cardList, source.droppableId, current, "CheckList"),
        destination.droppableId,
        next,
        "CheckList"
      );
};

export const updateColumn = (
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) => {
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
};

export const getSocketChange = (
  cardList: ListsProps[],
  result: SocketResultProps
) => {
  if (!result.listId) {
    if (cardList.filter((ele) => ele.id === result.id)?.length) {
      // column 互換
      cardList.filter((ele) => ele._id === result.id)[0].position =
        result.position;
      return JSON.parse(JSON.stringify(cardList));
    } else {
      // column 新增
      cardList.push({
        _id: result._id,
        name: result.name,
        position: result.position,
        boardId: result.boardId,
        card: [],
        id: result.id,
      });
      return JSON.parse(JSON.stringify(cardList));
    }
  }
  // column 內互換 與 column外互換
  const originColumn = cardList.filter(
    (ele) => ele.card.filter((cardEle) => cardEle.id === result.id)[0]
  )[0];
  const newData = {
    name: result.name,
    closed: result.closed,
    position: result.position,
    listId: result.listId,
    label: result.label,
    _id: result._id,
    member: result.member,
    createdAt: result.createdAt,
    updatedAt: result.createdAt,
    id: result.id,
    description: result.description,
    checklist: result.checklist,
    comment: result.comment,
    attachment: result.attachment,
    date: result.date,
  };
  if (!originColumn) {
    // 新增
    cardList.filter((ele) => ele.id === result.listId)[0].card.push(newData);
    return JSON.parse(JSON.stringify(cardList));
  }
  if (originColumn.id === result.listId) {
    // 同column 互換
    const useData = originColumn.card.filter((ele) => ele.id === result.id)[0];
    if (useData.position !== result.position) {
      useData.position = result.position;
      return JSON.parse(JSON.stringify(cardList));
    }
  }
  if (originColumn.id !== result.listId) {
    // 跨Column 互換
    const newColumn = cardList.filter((ele) => ele.id === result.listId)[0];
    originColumn.card = originColumn.card.filter((ele) => ele.id !== result.id);
    newColumn.card.push(newData);
    return JSON.parse(JSON.stringify(cardList));
  }
  return cardList;
};
