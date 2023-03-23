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
  isDragging: boolean;
}
