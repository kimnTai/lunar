import { AttachmentProps } from "./attachment";
import { ChecklistProps } from "./checklists";
import { CommentProps } from "./comments";
import { LabelsProps } from "./labels";

export interface CardsProps {
  name: string;
  closed: boolean;
  position: string;
  listId: string;
  label: LabelsProps[];
  _id: string;
  member: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  checklist: ChecklistProps[];
  comment: CommentProps[];
  attachment: AttachmentProps[];
  date: DateProps | null;
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
  boardId: string;
}

export interface DateProps {
  _id: string;
  cardId: string;
  dueComplete: boolean;
  dueDate: string;
  dueReminder: number;
  startDate: string;
}
