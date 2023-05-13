import Request from "@/api/base/request";
import type { UserProps } from "@/interfaces/user";

// 註冊
export const signInApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post<any, PrometheusResponse<UserProps>>(
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
  return Request.post<any, PrometheusResponse<UserProps>>("/user/login", data);
};

// google 登入
export const loginGoogleApi = () => Request.get<any, any>("/user/google");

// 驗證登入
export const loginJwtApi = () =>
  Request.get<any, PrometheusResponse<UserProps>>("/user/verifyJwt");

// 登出
export const logoutApi = () => Request.get<any, any>("/user/logout");
