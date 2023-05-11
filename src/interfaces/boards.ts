import { OrganizationMemberProps } from "./organization";
import { ListsProps } from "./lists";

export interface BoardsProps {
  _id: string;
  name: string;
  permission: string;
  closed: boolean;
  inviteLink: string;
  member: OrganizationMemberProps[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  list: ListsProps[];
  label: any[];
  id: string;
}

export interface NewBoardsProps {
  organizationId: string;
  name: string;
  permission: string;
}

export interface BillboardHeaderProps {
  name: string;
  member: OrganizationMemberProps[];
}

export interface SingleBoardProps {}
