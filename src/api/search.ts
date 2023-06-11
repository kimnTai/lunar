import Request from "@/api/base/request";
import { SearchLunarMemberProps } from "@/interfaces/search";
import { UserProps } from "@/interfaces/user";

// 搜尋Lunar使用者
export const searchLunarMemberApi = (data: SearchLunarMemberProps) => {
  if (data.organizationId) {
    return Request.get<any, PrometheusResponse<UserProps[]>>(
      `/search/members?query=${data.query}&organizationId=${data.organizationId}`
    );
  } else {
    return Request.get<any, PrometheusResponse<UserProps[]>>(
      `/search/members?query=${data.query}`
    );
  }
};
