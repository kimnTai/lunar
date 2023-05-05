import Request from "@/utils/request";

// 依組織取得Boards
export const getBoardsApi = (organizationId: string) => {
  return Request.get(`/boards?organizationId=${organizationId}`);
};
