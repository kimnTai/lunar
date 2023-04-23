import { LOGIN } from "../constants";
import { LoginProps } from "@/interfaces/user";
import { loginApi } from "@/api/auth";

interface LoginActionProps {
  type: string;
  payload: LoginProps;
}

export const LoginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    await loginApi(data).then((res: any) => {
      if (res.status === "success") dispatch({ type: LOGIN, payload: res });
    });
  };
