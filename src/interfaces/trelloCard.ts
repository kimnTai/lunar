export interface CardReducerProps {
  cardList: any[];
}

export interface CardProps {
  id: any;
  title: string;
  children: CardProps[];
  index?: number;
}

export interface TrelloCardProps extends CardProps {
  index: number;
  quotes: CardProps[];
  isScrollable: boolean;
  isCombineEnabled: boolean;
  useClone: any;
}

export interface TrelloInsideCardProps extends TrelloCardProps {
  listId: string;
  listType: string;
  internalScroll: boolean;
}
