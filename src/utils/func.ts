import { CardProps } from "@/interfaces/trelloCard";
import { DraggableLocation } from "react-beautiful-dnd";

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getNewData = (
  columns: CardProps[],
  title: string,
  newArr: CardProps[]
) => {
  let useCollumn = JSON.parse(JSON.stringify(columns));

  const useIndex = columns.findIndex((ele) => ele.title === title);
  let useArr = columns.filter((ele) => ele.title === title)[0];
  useArr.children = newArr;
  useCollumn.splice(useIndex, 1, useArr);
  return useCollumn;
};

export const reorderQuoteMap = (
  columns: CardProps[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const current = [
    ...columns.filter((ele) => ele.title === source.droppableId)[0].children,
  ];
  const next = [
    ...columns.filter((ele) => ele.title === destination.droppableId)[0]
      .children,
  ];

  // 同List
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return getNewData(columns, destination.droppableId, reordered);
  }

  // 不同 List
  const target = current[source.index];
  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);
  let ans = getNewData(columns, source.droppableId, current);
  ans = getNewData(ans, destination.droppableId, next);
  return ans;
};
