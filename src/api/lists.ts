import Request from "@/api/base/request";
import { UpdateListProps, NewListProps } from "@/interfaces/lists";

// 新增list
export const newListApi = (data: NewListProps) =>
  Request.post<any, any>("/lists", data);

// 更新list
export const updateListApi = (data: UpdateListProps) =>
  Request.put<any, any>(`/lists/${data.listId}`, data);
