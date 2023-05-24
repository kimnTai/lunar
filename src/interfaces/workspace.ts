import type { PropsFromRedux } from "@/router";

export interface WorkSpaceCardProps {
  title: string;
  backgroundUrl: string;
  permission: string;
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
  boardId: string;
}
