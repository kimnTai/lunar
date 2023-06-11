import { BoardsProps } from "./boards";
import { UserProps } from "./user";

export interface OrganizationProps {
  _id: string;
  name: string;
  permission: string;
  member: OrganizationMemberProps[];
  createdAt: string;
  updatedAt: string;
  board: Omit<BoardsProps, "list">[];
  id: string;
  inviteLink?: string;
}

export interface OrganizationMemberProps {
  role: string;
  userId: Pick<UserProps, "_id" | "name" | "avatar" | "email">;
}

export interface NewOrganizationFormProps {
  name: string;
  userIdList?: string[];
}

export interface AddOrganizationMemberProps {
  organizationId?: string;
  userIdList: string[];
}

export interface DeleteOrganizationMemberProps {
  organizationId: string;
  memberId: string;
}

export interface UpdateOrganizationMemberProps {
  organizationId: string;
  memberId: string;
  role?: string;
}

export interface UpdateOrganizationProps {
  organizationId: string;
  name?: string;
  permission?: string;
}

export interface DeleteOrganizationProps {
  organizationId: string;
}
