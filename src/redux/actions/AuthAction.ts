import { LOGIN } from "../constants";
import { LoginProps } from "@/interfaces/user";
import { loginApi, loginGoogleApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";

interface LoginActionProps {
  type: string;
  payload: LoginProps;
}

export const loginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    // await loginApi(data).then((res: any) => {
    //   if (res.status === "success") dispatch({ type: LOGIN, payload: res });
    // });
    // 暫時直接登入
    await dispatch({
      type: LOGIN,
      payload: { email: "string", password: "string", name: "string" },
    });

  };

export const loginGoogle = () => async (dispatch: (arg: any) => any) => {
  await loginGoogleApi().then((res: any) => {
    console.log(res);
    // if (res.status === "success") dispatch({ type: LOGIN, payload: res });
  });
};
