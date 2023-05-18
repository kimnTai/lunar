import Request from "@/api/base/request";
import { BoardsProps } from "@/interfaces/boards";
import { OrganizationProps } from "@/interfaces/organization";

// 邀請連結新增組織/看板成員
export const invitationApi = (data: {
  type: string;
  invitationToken: string;
}) => {
  return Request.post<any, PrometheusResponse<OrganizationProps | BoardsProps>>(
    `/invitation/${data.type}/${data.invitationToken}`
  );
};
