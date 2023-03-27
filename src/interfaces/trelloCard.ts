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
}

export interface TrelloCardInnerProps {
  quotes: any;
  dropProvided: DroppableProvided;
  isDrag: boolean;
}

export interface TrelloCardBottomFuncProps {
  newTitle: string;
  showAddCard: boolean;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setShowAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}
