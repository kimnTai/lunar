import Request from "@/utils/request";
import { NewOrganizationFormProps } from "@/interfaces/organization";

// 取得所有組織
export const getOrganizationsApi = () => {
  return Request.get("/organizations");
};

// 新增組織
export const newOrganizationApi = (data: NewOrganizationFormProps) => {
  return Request.post("/organizations", data);
};
