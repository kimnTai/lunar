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
  label: any[];
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
  labelData: LabelsProps[];
}

export interface SingleBoardProps {}

export interface PopoverTitleProps {
  isMenu: boolean;
  isUser: boolean;
  isSetting: boolean;
  isLabel: boolean;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLabel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PopoverContentProps {
  name: string;
  member: OrganizationMemberProps[];
  orgId: string;
  labelData: LabelsProps[];
  isUser: boolean;
  isMenu: boolean;
  isSetting: boolean;
  isLabel: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLabel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddBoardsMembers {
  boardId: string;
  userIdList: string[];
}
