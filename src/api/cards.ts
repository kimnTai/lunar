import Request from "@/api/base/request";
import type {
  UpdateCardProps,
  NewCardProps,
  CardsProps,
} from "@/interfaces/cards";

// 新增
export const newCardApi = (data: NewCardProps) =>
  Request.post<any, PrometheusResponse<CardsProps>>("/cards", data);

// 更新card
export const updateCardApi = (data: UpdateCardProps) =>
  Request.put<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}`,
    data
  );
