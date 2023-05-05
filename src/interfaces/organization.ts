export interface OrganizationProps {
  _id: string;
  name: string;
  permission: string;
  member: OrganizationMemberProps[];
  createdAt: string;
  updatedAt: string;
  board: any[];
  id: string;
}

export interface OrganizationMemberProps {
  userId: string;
  role: string;
}


export interface NewOrganizationFormProps {
  name: string;
}
