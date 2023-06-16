export interface SearchLunarMemberProps {
  query: string;
  organizationId?: string;
}

export interface SearchCardsProps {
  query: string;
}

export interface SearchCardsResultProps {
  name: string;
  closed: boolean;
  position: string;
  listId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  boardId: {
    _id: string;
    id: string;
    name: string;
  };
}
