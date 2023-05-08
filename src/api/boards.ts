import Request from "@/utils/request";
import { NewBoardsProps } from "@/interfaces/boards";

// 新增boards
export const newBoardApi = (data: NewBoardsProps) => {
  return Request.post(`/boards`, { ...data });
};

// 刪除boards
export const deleteBoardApi = (id:string) => Request.delete(`/boards/${id}`)