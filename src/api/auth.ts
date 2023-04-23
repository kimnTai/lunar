import Request from "@/utils/request";

// 登入
export const loginApi = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return Request.post("api/user/login", data);
};
