import Request from "@/api/base/request";

// 註冊
export const signInApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post<any, any>("/user/register", data);
};

// 登入
export const loginApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post<any, any>("/user/login", data);
};

// google 登入
export const loginGoogleApi = () => Request.get<any, any>("/user/google");

// 驗證登入
export const loginJwtApi = () => Request.get<any, any>("/user/verifyJwt");

// 登出
export const logoutApi = () => Request.get<any, any>("/user/logout");
