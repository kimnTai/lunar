import Request from "@/utils/request";
import { UpdateCardProps } from "@/interfaces/cards";

// 更新card

export const updateCardApi = (data: UpdateCardProps) =>
  Request.put(`/cards/${data.cardId}`, data);
