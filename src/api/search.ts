import Request from "@/api/base/request";
import { searchLunarMemberProps } from "@/interfaces/search";
import { UserProps } from "@/interfaces/user";

// 搜尋Lunar使用者
export const searchLunarMemberApi = (data: searchLunarMemberProps) => {
  const { query, organizationId } = data;

  return Request.get<any, PrometheusResponse<UserProps[]>>(
    `/search/members?query=${query}&organizationId=${organizationId}`
  );
};
