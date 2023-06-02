import { OrganizationMemberProps } from "./organization";
import { ListsProps } from "./lists";
import { LabelsProps } from "./labels";

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
}

export interface BillboardHeaderProps {
  name: string;
  member: OrganizationMemberProps[];
  boardInviteLink: string;
  orgId: string;
  callGetBoardApi: (id: string) => Promise<void>;
  boardId: string;
  image?: string;
  permission: string;
  closed: boolean;
}

export interface SingleBoardProps {}

export type HeaderState = "MENU" | "USER" | "SETTING" | "LABEL";

export interface PopoverTitleProps {
  headerState: HeaderState;
  setHeaderState: React.Dispatch<React.SetStateAction<HeaderState>>;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PopoverContentProps {
  headerState: HeaderState;
  setHeaderState: React.Dispatch<React.SetStateAction<HeaderState>>;
  name: string;
  member: OrganizationMemberProps[];
  orgId: string;

  callGetBoardApi: (id: string) => Promise<void>;
  boardId: string;
  permission: string;
  closed: boolean;
  image?: string;
}

export interface AddBoardsMembers {
  boardId: string;
  userIdList: string[];
}
