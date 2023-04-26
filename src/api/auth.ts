import Request from "@/utils/request";

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

export const loginGoogleJWT = (token: any) =>
  Request.post("/user/google/verifyToken", { token });
