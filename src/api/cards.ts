import Request from "@/api/base/request";
import type {
  UpdateCardProps,
  NewCardProps,
  CardsProps,
} from "@/interfaces/cards";

// 取得單張卡片
export const getCardApi = (cardId: string) =>
  Request.get<any, PrometheusResponse<CardsProps>>(`/cards/${cardId}`);

// 新增
export const newCardApi = (data: NewCardProps) =>
  Request.post<any, PrometheusResponse<CardsProps>>("/cards", data);

// 更新卡片標題、描述、位置、封存
export const updateCardApi = (data: UpdateCardProps) =>
  Request.put<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}`,
    data
  );
