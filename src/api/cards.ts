import Request from "@/api/base/request";
import type {
  UpdateCardProps,
  NewCardProps,
  CardsProps,
  UpdateCardCheckItem,
  UpdateCardCheckList,
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

// 更新checkItem
export const updateCheckItemApi = (data: UpdateCardCheckItem) =>
  data.checklistIdOld
    ? Request.put(
        `/cards/${data.cardId}/checklist/${data.checklistIdOld}/checkItem/${data.checkItemId}`,
        data
      )
    : Request.put(
        `/cards/${data.cardId}/checklist/${data.checklistId}/checkItem/${data.checkItemId}`,
        data
      );

// 更新checkList
export const updateChecklistApi = (data: UpdateCardCheckList) =>
  Request.put(`/cards/${data.cardId}/checklist/${data.checklistId}`, data);
