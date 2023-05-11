import Request from "@/utils/request";
import { UpdateListProps, NewListProps } from "@/interfaces/lists";

// 新增list
export const newListApi = (data: NewListProps) => Request.post("/lists", data);

// 更新list
export const updateListApi = (data: UpdateListProps) =>
  Request.put(`/lists/${data.listId}`, data);
