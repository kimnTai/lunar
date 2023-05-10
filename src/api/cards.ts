import Request from "@/utils/request";
import { UpdateCardProps } from "@/interfaces/cards";

// 取得特定boradId 中所有cards

export const updateCard = (data: UpdateCardProps) =>
  Request.put(`/cards/${data.cardId}`, data);
