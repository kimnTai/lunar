import { DroppableProvided } from "react-beautiful-dnd";
import { ListsProps } from "./lists";

export interface UrlCardShareProps {
  listId?: string;
  cardId: string;
  open: boolean;
}

export interface TrelloCardProps {
  index: number;
  quotes: ListsProps;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

export interface TrelloCardListProps extends TrelloCardProps {
  listId: string;
  listType: string;
  internalScroll: boolean;
}

export interface TrelloCardInnerProps {
  lists: ListsProps;
  dropProvided: DroppableProvided;
  isDrag: boolean;
}

export interface TrelloCardModalProps {
  openModal: UrlCardShareProps;
  setOpenModal: React.Dispatch<React.SetStateAction<UrlCardShareProps>>;
}
