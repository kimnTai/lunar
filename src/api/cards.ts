import Request from "@/utils/request";
import { UpdateCardProps, NewCardProps } from "@/interfaces/cards";

// 新增
export const newCardApi = (data: NewCardProps) => Request.post("/cards", data);

// 更新card
export const updateCardApi = (data: UpdateCardProps) =>
  Request.put(`/cards/${data.cardId}`, data);
