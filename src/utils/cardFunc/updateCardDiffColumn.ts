import { updateCardApi, updateCheckItemApi } from "@/api/cards";
import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DropResult } from "react-beautiful-dnd";
import { CheckItemProps, ChecklistProps } from "@/interfaces/checklists";
import { nextPosition } from "./nextPosition";

function getNewColumn(
  columns: (ListsProps | ChecklistProps)[],
  id: string,
  newArr: (CardsProps | CheckItemProps)[],
  type = "Card"
) {
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
}

function getColumn(
  columns: (ListsProps | ChecklistProps)[],
  id: string,
  type = "Card"
) {
  return type === "Card"
    ? columns.find((ele) => ele.id === id) || { card: [] }
    : columns.find((ele) => ele.id === id) || { checkItem: [] };
}

export function updateCardDiffColumn(
  result: DropResult,
  cardList: (ListsProps | ChecklistProps)[],
  type = "Card"
) {
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
}
