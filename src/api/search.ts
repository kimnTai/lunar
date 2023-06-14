import Request from "@/api/base/request";
import {
  SearchCardsProps,
  SearchCardsResultProps,
  SearchLunarMemberProps,
} from "@/interfaces/search";
import { UserProps } from "@/interfaces/user";

// 搜尋Lunar使用者
export const searchLunarMemberApi = (data: SearchLunarMemberProps) =>
  Request.get<any, PrometheusResponse<UserProps[]>>(`/search/members`, {
    params: data,
  });

// 搜尋使用者卡片
export const searchCardsApi = (data: SearchCardsProps) =>
  Request.get<any, PrometheusResponse<SearchCardsResultProps[]>>(
    `/search/cards`,
    {
      params: data,
    }
  );
