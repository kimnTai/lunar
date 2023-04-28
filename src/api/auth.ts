import Request from "@/utils/request";

// 註冊
export const signInApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post("/user/register", data);
};

// 登入
export const loginApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post("/user/login", data);
};

// google 登入
export const loginGoogleApi = () => Request.get("/user/google");

export const loginGoogleJWT = (token: string) =>
  Request.post("/user/google/verifyToken", { token });

// 驗證登入
export const loginJwtApi = () => Request.get("/user/verifyJwt");

// 登出
export const logoutApi = () => Request.get("/user/logout");
