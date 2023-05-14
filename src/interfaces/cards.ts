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
  description: string;
  checklist: any[];
  comment: any[];
  attachment: any[];
  date: object | null;
}

export interface UpdateCardProps {
  name?: string;
  listId?: string;
  cardId: string;
  position?: string;
  closed?: boolean;
  description?: string;
}

export interface NewCardProps {
  name: string;
  position: string;
  listId: string;
}
