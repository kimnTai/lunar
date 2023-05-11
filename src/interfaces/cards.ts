export interface CardsProps {
  [x: number]: any;
  name: string;
  closed: boolean;
  position: string;
  listId: string;
  label: any[];
  _id: string;
  member: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UpdateCardProps {
  name?: string;
  listId: string;
  cardId: string;
  position: string;
  closed: boolean;
}
