import type { PropsFromRedux } from "@/router";

export interface WorkSpaceCardProps {
  title: string;
  backgroundUrl: string;
  privacy: string;
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
  id: string;
}
