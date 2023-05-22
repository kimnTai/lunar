import Request from "@/api/base/request";
import type {
  DeleteOrganizationMemberProps,
  DeleteOrganizationProps,
  NewOrganizationFormProps,
  OrganizationProps,
  UpdateOrganizationMemberProps,
  UpdateOrganizationProps,
  addOrganizationMemberProps,
} from "@/interfaces/organization";

// 取得會員所有組織
export const getUserOrganizationsApi = () => {
  return Request.get<any, PrometheusResponse<OrganizationProps[]>>(
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

// 新增組織成員
export const addOrganizationMember = (data: addOrganizationMemberProps) => {
  const { organizationId } = data;

  return Request.post<any, PrometheusResponse<OrganizationProps>>(
    `/organizations/${organizationId}/members`,
    data
  );
};

// 移除組織成員
export const deleteOrganizationMemberApi = (
  data: DeleteOrganizationMemberProps
) => {
  const { organizationId, memberId } = data;

  return Request.delete<any, PrometheusResponse<OrganizationProps>>(
    `/organizations/${organizationId}/members/${memberId}`
  );
};

// 更新成員權限
export const updateOrganizationMemberApi = (
  data: UpdateOrganizationMemberProps
) => {
  const { organizationId, memberId } = data;

  return Request.put<any, PrometheusResponse<OrganizationProps>>(
    `/organizations/${organizationId}/members/${memberId}`,
    data
  );
};

// 更新組織
export const updateOrganizationApi = (data: UpdateOrganizationProps) => {
  const { organizationId } = data;

  return Request.put<any, PrometheusResponse<OrganizationProps>>(
    `/organizations/${organizationId}`,
    data
  );
};

// 移除組織
export const deleteOrganizationApi = (data: DeleteOrganizationProps) => {
  const { organizationId } = data;

  return Request.delete<any, PrometheusResponse<OrganizationProps>>(
    `/organizations/${organizationId}`
  );
};
