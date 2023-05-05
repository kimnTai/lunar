import Request from "@/utils/request";

// 依組織取得Boards
export const getBordsApi = (organizationId: string) => {
  return Request.get(`/boards?organizationId=${organizationId}`);
};
