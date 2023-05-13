import Request from "@/api/base/request";
import { UpdateCardProps, NewCardProps } from "@/interfaces/cards";

// 新增
export const newCardApi = (data: NewCardProps) =>
  Request.post<any, any>("/cards", data);

// 更新card
export const updateCardApi = (data: UpdateCardProps) =>
  Request.put<any, any>(`/cards/${data.cardId}`, data);
