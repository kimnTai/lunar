import Request from "@/api/base/request";
import type {
  NewOrganizationFormProps,
  OrganizationProps,
} from "@/interfaces/organization";

// 取得所有組織
export const getOrganizationsApi = () => {
  return Request.get<any, PrometheusResponse<OrganizationProps>>(
    "/organizations/user"
  );
};

// 新增組織
export const newOrganizationApi = (data: NewOrganizationFormProps) => {
  return Request.post<any, PrometheusResponse<OrganizationProps>>(
    "/organizations",
    data
  );
};
