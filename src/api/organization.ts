import Request from "@/utils/request";

// 取得所有組織
export const getOrganizationsApi = (userId: string) => {
  return Request.get("/organizations/", { userId } as any);
};
