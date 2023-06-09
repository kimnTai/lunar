import Request from "@/api/base/request";
import { BoardsProps } from "@/interfaces/boards";
import type { NotificationProps } from "@/interfaces/notification";
import type { UserProps } from "@/interfaces/user";

// 註冊
export const signInApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post<any, PrometheusResponseWithToken<UserProps>>(
    "/user/register",
    data
  );
};

// 登入
export const loginApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post<any, PrometheusResponseWithToken<UserProps>>(
    "/user/login",
    data
  );
};

// 驗證登入
export const loginJwtApi = () =>
  Request.get<any, PrometheusResponseWithToken<UserProps>>("/user/verifyJwt");

// 登出
export const logoutApi = () => Request.get<any, any>("/user/logout");

// 取得使用者通知
export const getNotificationApi = () => {
  return Request.get<any, PrometheusResponse<NotificationProps[]>>(
    "/user/notification"
  );
};

// 修改使用者通知
export const updateNotificationApi = (data: {
  notificationId: string;
  isRead: boolean;
}) => {
  return Request.put<any, PrometheusResponse<NotificationProps>>(
    `/user/notification/${data.notificationId}`,
    {
      isRead: data.isRead,
    }
  );
};

// 刪除使用者通知
export const deleteNotificationApi = (data: { notificationId: string }) => {
  return Request.delete<any, PrometheusResponse<NotificationProps>>(
    `/user/notification/${data.notificationId}`
  );
};

export const getRecentBoardsApi = () => {
  return Request.get<any, PrometheusResponse<Omit<BoardsProps, "list">[]>>(
    `/user/recentBoards`
  );
};
