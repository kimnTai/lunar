import Request from "@/api/base/request";
import { NewOrganizationFormProps } from "@/interfaces/organization";

// 取得所有組織
export const getOrganizationsApi = () => {
  return Request.get<any, any>("/organizations/user");
};

// 新增組織
export const newOrganizationApi = (data: NewOrganizationFormProps) => {
  return Request.post<any, any>("/organizations", data);
};
