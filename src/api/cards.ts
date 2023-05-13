import Request from "@/utils/request";
import { UpdateCardProps, NewCardProps } from "@/interfaces/cards";

// 取得單張卡片
export const getCardApi = (cardId: string) => Request.get(`/cards/${cardId}`);

// 新增
export const newCardApi = (data: NewCardProps) => Request.post("/cards", data);

// 更新卡片標題、描述、位置、封存
export const updateCardApi = (data: UpdateCardProps) =>
  Request.put(`/cards/${data.cardId}`, data);
