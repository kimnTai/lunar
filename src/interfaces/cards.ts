import { AttachmentProps } from "./attachment";
import { ChecklistProps } from "./checklists";
import { CommentProps } from "./comments";
import { LabelsProps } from "./labels";
import { OrganizationMemberProps } from "./organization";

export interface CardsProps {
  name: string;
  closed: boolean;
  position: string;
  listId: string;
  label: LabelsProps[];
  _id: string;
  member: OrganizationMemberProps[];
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  checklist: ChecklistProps[];
  comment: CommentProps[];
  attachment: AttachmentProps[];
  date: DateProps | null;
  boardId?: string;
}

export interface UpdateCardProps {
  name?: string;
  listId?: string;
  cardId: string;
  position?: string;
  closed?: boolean;
  description?: string;
  boardId?: string;
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

export interface NewCardDateProps {
  cardId: string;
  startDate?: string;
  dueDate?: string;
  dueReminder?: number;
}

export interface UpdateCardDateProps {
  cardId: string;
  startDate?: string;
  dueDate?: string;
  dueComplete?: boolean;
  dueReminder?: number;
}

export interface AddCardMemberProps {
  cardId: string;
  userIdList: string[];
}

export interface CloneCardProps {
  sourceCardId: string;
  boardId: string;
  listId: string;
  name: string;
  position: string;
}
