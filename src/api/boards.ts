import Request from "@/api/base/request";
import { NewBoardsProps } from "@/interfaces/boards";

// 新增boards
export const newBoardApi = (data: NewBoardsProps) => {
  return Request.post<any, any>(`/boards`, { ...data });
};

// 刪除boards
export const deleteBoardApi = (id: string) =>
  Request.delete<any, any>(`/boards/${id}`);

// 取得單一看板, 取得所有列表
export const getBoardApi = (id: string) =>
  Request.get<any, any>(`/boards/${id}`);
