import type { PropsFromRedux } from "@/router";

export interface WorkSpaceCardProps {
  title: string;
  backgroundImage?: string;
  permission: string;
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
  boardId: string;
}
