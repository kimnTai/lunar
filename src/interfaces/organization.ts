import { BoardsProps } from "./boards";

export interface OrganizationProps {
  _id: string;
  name: string;
  permission: string;
  member: OrganizationMemberProps[];
  createdAt: string;
  updatedAt: string;
  board: BoardsProps[];
  id: string;
  inviteLink?: string;
}

export interface OrganizationMemberProps {
  role: string;
  userId: {
    _id: string;
    name: string;
    avatar: string;
    email: string;
  };
}

export interface NewOrganizationFormProps {
  name: string;
  userIdList?: string[];
}

export interface addOrganizationMemberProps {
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
