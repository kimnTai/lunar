import Request from "@/utils/request";
import { NewBoardsProps } from "@/interfaces/boards";
// 依組織取得Boards 目前未使用
// export const getBoardsApi = (organizationId: string) => {
//   return Request.get(`/boards?organizationId=${organizationId}`);
// };


// 新增boards
export const newBoardApi = (data: NewBoardsProps) => {
  return Request.post(`/boards`, { ...data });
};
