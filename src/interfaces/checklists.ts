export interface CheckItemProps {
  _id: string;
  name: string;
  completed: boolean;
  position: string;
  checklistId: string;
}

export interface ChecklistProps {
  _id: string;
  name: string;
  position: string;
  cardId: string;
  checkItem: CheckItemProps[];
  id: string;
}
