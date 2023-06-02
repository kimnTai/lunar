import Request from "@/api/base/request";
import type {
  UpdateCardProps,
  NewCardProps,
  CardsProps,
  UpdateCardCheckItem,
  UpdateCardCheckList,
  DateProps,
  NewCardDateProps,
  UpdateCardDateProps,
  addCardMemberProps,
} from "@/interfaces/cards";
import { CommentProps, NewCommentProps } from "@/interfaces/comments";
import { CardLabelsProps } from "@/interfaces/labels";

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

// 新增卡片評論
export const newCardCommentApi = (data: NewCommentProps) =>
  Request.post<any, PrometheusResponse<CommentProps>>(
    `/cards/${data.cardId}/comments`,
    data
  );

// 新增卡片日期
export const newCardDateApi = (cardId: string, data: NewCardDateProps) =>
  Request.post<any, PrometheusResponse<DateProps>>(
    `/cards/${cardId}/date`,
    data
  );

// 修改卡片日期
export const updateCardDateApi = (cardId: string, data: UpdateCardDateProps) =>
  Request.put<any, PrometheusResponse<DateProps>>(
    `/cards/${cardId}/date`,
    data
  );

// 移除卡片日期
export const deleteCardDateApi = (cardId: string) => {
  return Request.delete<any, PrometheusResponse<DateProps>>(
    `/cards/${cardId}/date`
  );
};

// 複製單一卡片
export const postCloneCardApi = (data: {
  sourceCardId: string;
  boardId: string;
  listId: string;
  name: string;
  position: string;
}) =>
  Request.post<any, PrometheusResponse<CardsProps>>(`/cards/cloneById`, {
    ...data,
  });

// 新增多位卡片成員
export const addCardMemberApi = (data: addCardMemberProps) => {
  return Request.post<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/members`,
    data
  );
};

// 增加卡片標籤
export const AddCardLabelApi = (data: CardLabelsProps) => {
  return Request.post<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/labels`,
    data
  );
};

// 移除卡片標籤
export const DeleteCardLabelApi = (data: CardLabelsProps) => {
  return Request.delete<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/labels/${data.labelId}`
  );
};
