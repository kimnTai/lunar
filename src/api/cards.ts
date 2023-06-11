import Request from "@/api/base/request";
import type {
  UpdateCardProps,
  NewCardProps,
  CardsProps,
  DateProps,
  NewCardDateProps,
  UpdateCardDateProps,
  AddCardMemberProps,
  CloneCardProps,
} from "@/interfaces/cards";
import {
  ChecklistProps,
  CheckItemProps,
  NewCardCheckListProps,
  UpdateCardCheckListProps,
  DeleteCardCheckListProps,
  UpdateCardCheckItemProps,
  NewCheckItemProps,
} from "@/interfaces/checklists";
import {
  CommentProps,
  DeleteCommentProps,
  NewCommentProps,
  UpdateCommentProps,
} from "@/interfaces/comments";
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

// 新增checkList
export const newChecklistApi = (data: NewCardCheckListProps) =>
  Request.post<any, PrometheusResponse<ChecklistProps>>(
    `/cards/${data.cardId}/checklist`,
    data
  );

// 更新checkList
export const updateChecklistApi = (data: UpdateCardCheckListProps) =>
  Request.put<any, PrometheusResponse<ChecklistProps>>(
    `/cards/${data.cardId}/checklist/${data.checklistId}`,
    data
  );

// 刪除checkList
export const deleteChecklistApi = (data: DeleteCardCheckListProps) =>
  Request.delete<any, PrometheusResponse<ChecklistProps>>(
    `/cards/${data.cardId}/checklist/${data.checklistId}`
  );

// 新增checkItem
export const newCheckItemApi = (data: NewCheckItemProps) =>
  Request.post<any, PrometheusResponse<CheckItemProps>>(
    `/cards/${data.cardId}/checklist/${data.checklistId}/checkItem`,
    data
  );

// 更新checkItem
export const updateCheckItemApi = (data: UpdateCardCheckItemProps) =>
  data.checklistIdOld
    ? Request.put<any, PrometheusResponse<CheckItemProps>>(
        `/cards/${data.cardId}/checklist/${data.checklistIdOld}/checkItem/${data.checkItemId}`,
        data
      )
    : Request.put<any, PrometheusResponse<CheckItemProps>>(
        `/cards/${data.cardId}/checklist/${data.checklistId}/checkItem/${data.checkItemId}`,
        data
      );

// 刪除checkItem
export const deleteCheckItemApi = (data: UpdateCardCheckItemProps) =>
  Request.delete<any, PrometheusResponse<CheckItemProps>>(
    `/cards/${data.cardId}/checklist/${data.checklistId}/checkItem/${data.checkItemId}`
  );

// 新增卡片評論
export const newCardCommentApi = (data: NewCommentProps) =>
  Request.post<any, PrometheusResponse<CommentProps>>(
    `/cards/${data.cardId}/comments`,
    data
  );

export const updateCardCommentApi = (data: UpdateCommentProps) => {
  return Request.put<any, PrometheusResponse<CommentProps>>(
    `/cards/${data.cardId}/comments/${data.commentId}`,
    data
  );
};

export const deleteCardCommentApi = (data: DeleteCommentProps) =>
  Request.delete<any, PrometheusResponse<CommentProps>>(
    `/cards/${data.cardId}/comments/${data.commentId}`
  );

// 新增卡片日期
export const newCardDateApi = (data: NewCardDateProps) =>
  Request.post<any, PrometheusResponse<DateProps>>(
    `/cards/${data.cardId}/date`,
    data
  );

// 修改卡片日期
export const updateCardDateApi = (data: UpdateCardDateProps) =>
  Request.put<any, PrometheusResponse<DateProps>>(
    `/cards/${data.cardId}/date`,
    data
  );

// 移除卡片日期
export const deleteCardDateApi = (cardId: string) => {
  return Request.delete<any, PrometheusResponse<DateProps>>(
    `/cards/${cardId}/date`
  );
};

// 複製單一卡片
export const postCloneCardApi = (data: CloneCardProps) =>
  Request.post<any, PrometheusResponse<CardsProps>>(`/cards/cloneById`, {
    ...data,
  });

// 新增多位卡片成員
export const addCardMemberApi = (data: AddCardMemberProps) => {
  return Request.post<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/members`,
    data
  );
};

// 增加卡片標籤
export const addCardLabelApi = (data: CardLabelsProps) => {
  return Request.post<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/labels`,
    data
  );
};

// 移除卡片標籤
export const deleteCardLabelApi = (data: CardLabelsProps) => {
  return Request.delete<any, PrometheusResponse<CardsProps>>(
    `/cards/${data.cardId}/labels/${data.labelId}`
  );
};
