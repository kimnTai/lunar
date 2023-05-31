import { UserProps } from "./user";

export interface NotificationProps {
  _id: string;
  isRead: boolean;
  userId: UserProps;
  sourceUserId: UserProps;
  createdAt: string;
  updatedAt: string;
  type: "ADD_MEMBER" | "REMOVE_MEMBER" | "UPDATE_ROLE";
  data: {
    organization?: {
      id: string;
      name: string;
      role?: "editor" | "viewer" | "manager";
    };
    board?: {
      id: string;
      name: string;
      role?: "editor" | "viewer" | "manager";
    };
    card?: {
      id: string;
      name?: string;
      role?: "";
    };
  };
}
