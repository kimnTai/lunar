import { CardsProps } from "./cards";

export interface ListsProps {
  _id: string;
  name: string;
  position: string;
  boardId: string;
  card: CardsProps[];
  id: string;
  updatedAt: string;
  createdAt: string;
  closed: boolean;
}

export interface UpdateListProps {
  name?: string;
  listId: string;
  position?: string;
  closed?: boolean;
  boardId?: string;
}

export interface AddListProps {}

export interface NewListProps {
  name: string;
  boardId: string;
  position: string;
}

export type ListsHeaderState =
  | "NONE"
  | "ACTION"
  | "CLOSED_CARD"
  | "MOVE"
  | "CLONE"
  | "MOVE_CARD";
