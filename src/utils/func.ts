import { ListsProps } from "@/interfaces/lists";
import { CardsProps } from "@/interfaces/cards";
import { DraggableLocation } from "react-beautiful-dnd";
import type { MenuProps } from "antd";

export const reorder = (
  list: CardsProps[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result as any;
};

const getNewData = (
  columns: ListsProps[],
  name: string,
  newArr: ListsProps[]
) => {
  let useColumn = [...columns];
  const useIndex = columns.findIndex((ele) => ele.name === name);
  if (useIndex !== -1) {
    const useArr = { ...useColumn[useIndex], children: newArr };
    useColumn.splice(useIndex, 1, useArr);
  }
  return useColumn;
};

const getColumn = (columns: ListsProps[], name: string) => {
  return columns.find((column) => column.name === name) || { card: [] };
};

export const reorderQuoteMap = (
  columns: ListsProps[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const current = [...getColumn(columns, source.droppableId).card] as any;
  const next = [...getColumn(columns, destination.droppableId).card] as any;

  // 同List
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return getNewData(columns, destination.droppableId, reordered);
  }

  // 不同 List
  const target = current[source.index];
  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  return getNewData(
    getNewData(columns, source.droppableId, current),
    destination.droppableId,
    next
  );
};

type MenuItem = Required<MenuProps>["items"][number];

export const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};
