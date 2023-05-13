import Request from "@/api/base/request";
import type {
  UpdateListProps,
  NewListProps,
  ListsProps,
} from "@/interfaces/lists";

// 新增list
export const newListApi = (data: NewListProps) =>
  Request.post<any, PrometheusResponse<ListsProps>>("/lists", data);

// 更新list
export const updateListApi = (data: UpdateListProps) =>
  Request.put<any, PrometheusResponse<ListsProps>>(
    `/lists/${data.listId}`,
    data
  );
