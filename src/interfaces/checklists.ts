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

export interface NewCardCheckListProps {
  cardId: string;
  name: string;
  position: string;
}

export interface UpdateCardCheckListProps {
  cardId: string;
  checklistId: string;
  name?: string;
  position: string;
  checklistIdOld?: string;
}

export interface DeleteCardCheckListProps {
  cardId: string;
  checklistId: string;
}

export interface UpdateCardCheckItemProps extends UpdateCardCheckListProps {
  checkItemId: string;
  completed?: boolean;
}

export interface NewCheckItemProps {
  cardId: string;
  checklistId: string;
  name: string;
  position: string;
}

export interface DeleteChecklistItemProps {
  cardId: string;
  checklistId: string;
  checkItemId: string;
}
