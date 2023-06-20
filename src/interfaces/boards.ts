import { OrganizationMemberProps } from "./organization";
import { ListsProps } from "./lists";
import { LabelsProps } from "./labels";
import { CardsProps } from "./cards";

export interface BoardsProps {
  _id: string;
  name: string;
  permission: string;
  closed: boolean;
  inviteLink?: string;
  member: OrganizationMemberProps[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  list: ListsProps[];
  label: LabelsProps[];
  id: string;
  image?: string;
}

export interface NewBoardsProps {
  organizationId: string;
  name: string;
  permission: string;
  templateId?: string;
}

export interface BillboardHeaderProps {
  board?: BoardsProps;
}

export interface SingleBoardProps {}

export type HeaderState = "MENU" | "USER" | "SETTING" | "LABEL" | "ARCHIVE";

export interface PopoverTitleProps {
  headerState: HeaderState;
  setHeaderState: React.Dispatch<React.SetStateAction<HeaderState>>;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PopoverContentProps {
  headerState: HeaderState;
  setHeaderState: React.Dispatch<React.SetStateAction<HeaderState>>;
  board?: BoardsProps;
}

export interface AddBoardsMembers {
  boardId: string;
  userIdList: string[];
}

export interface UpdateBoardsMembers {
  boardId: string;
  memberId: string;
  role?: string;
}

export interface DeleteBoardsMembers {
  boardId: string;
  memberId: string;
}

export interface UpdateBoardProps {
  boardId: string;
  name?: string;
  organizationId?: string;
  permission?: string;
  closed?: boolean;
  image?: string;
}

export interface CloneBoardProps {
  sourceBoardId: string;
  organizationId: string;
  name: string;
}

export interface ClosedItemsProps {
  closedList: ListsProps[];
  closedCard: CardsProps[];
}
