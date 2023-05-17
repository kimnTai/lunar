import Request from "@/api/base/request";
import type { BoardsProps, NewBoardsProps } from "@/interfaces/boards";

// 新增boards
export const newBoardApi = (data: NewBoardsProps) => {
  return Request.post<any, PrometheusResponse<BoardsProps>>(`/boards`, {
    ...data,
  });
};

// 刪除boards
export const deleteBoardApi = (id: string) =>
  Request.delete<any, PrometheusResponse<BoardsProps>>(`/boards/${id}`);

// 取得單一看板, 取得所有列表
export const getBoardApi = (id: string) =>
  Request.get<any, PrometheusResponse<BoardsProps>>(`/boards/${id}`);

// 刪除Boards Member
export const deletBoardMemberApi = (boardId: string, memberId: string) =>
  Request.delete<any, PrometheusResponse<BoardsProps>>(
    `/${boardId}/members/${memberId}`
  );
