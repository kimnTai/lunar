import { DroppableProvided } from "react-beautiful-dnd";
import { ListsProps } from "./lists";

export interface UrlCardShareProps {
  listId?: string;
  cardId: string;
  open: boolean;
}

export interface CardReducerProps {
  cardList: any[];
}

export interface TrelloCardProps {
  index: number;
  quotes: ListsProps;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
  openModal: UrlCardShareProps;
  setOpenModal: React.Dispatch<React.SetStateAction<UrlCardShareProps>>;
}

export interface TrelloCardListProps
  extends TrelloCardProps,
    TrelloCardBottomFuncProps {
  listId: string;
  listType: string;
  internalScroll: boolean;
}

export interface TrelloCardInnerProps {
  lists: ListsProps;
  dropProvided: DroppableProvided;
  isDrag: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<UrlCardShareProps>>;
}

export interface TrelloCardBottomFuncProps {
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TrelloCardHeaderProps extends TrelloCardBottomFuncProps {
  title: string;
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TrelloCardModalProps {
  openModal: UrlCardShareProps;
  setOpenModal: React.Dispatch<React.SetStateAction<UrlCardShareProps>>;
}
