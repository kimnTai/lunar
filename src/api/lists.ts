import Request from "@/utils/request";
import { UpdateListProps } from "@/interfaces/lists";

// 更新list
export const updateListApi = (data: UpdateListProps) =>
  Request.put(`/lists/${data.listId}`, data);
