import { DroppableProvided } from "react-beautiful-dnd";

export interface CardReducerProps {
  cardList: any[];
}

export interface CardProps {
  id: any;
  title: string;
  children: CardProps[];
  index?: number;
}

export interface TrelloCardProps {
  index: number;
  quotes: CardProps;
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

export interface TrelloCardListProps
  extends TrelloCardProps,
    TrelloCardBottomFuncProps {
  listId: string;
  listType: string;
  internalScroll: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<openModalProps>>;
}

export interface TrelloCardInnerProps {
  quotes: any;
  dropProvided: DroppableProvided;
  isDrag: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<openModalProps>>;
}

export interface TrelloCardBottomFuncProps {
  showAddCard: boolean;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TrelloCardHeaderProps {
  title: string;
}

export interface TrelloCardModalProps {
  openModal: openModalProps;
  setOpenModal: React.Dispatch<React.SetStateAction<openModalProps>>;
}

interface openModalProps {
  id: string;
  open: boolean;
}
