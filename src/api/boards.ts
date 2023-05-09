import Request from "@/utils/request";
import { NewBoardsProps } from "@/interfaces/boards";

// 新增boards
export const newBoardApi = (data: NewBoardsProps) => {
  return Request.post(`/boards`, { ...data });
};

// 刪除boards
export const deleteBoardApi = (id: string) => Request.delete(`/boards/${id}`);

// 取得單一看板, 取得所有列表
export const getBoardApi = (id: string) => Request.get(`/boards/${id}`);
