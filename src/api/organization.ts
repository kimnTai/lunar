import Request from "@/utils/request";
import { NewOrganizationFormProps } from "@/interfaces/organization";

// 取得所有組織
export const getOrganizationsApi = (userId: string) => {
  return Request.get("/organizations/", { userId } as any);
};

// 新增組織
export const newOrganizationApi = (data: NewOrganizationFormProps) => {
  return Request.post("/organization", data);
};
