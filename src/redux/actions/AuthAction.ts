import { LOGIN } from "../constants";
import { LoginProps } from "@/interfaces/user";
import {
  loginApi,
  loginGoogleApi,
  loginGoogleJWT,
  signInApi,
} from "@/api/auth";

interface LoginActionProps {
  type: string;
  payload: LoginProps;
}

export const signInAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    await signInApi(data).then((res: any) => {
      if (res.status === "success") dispatch({ type: LOGIN, payload: res });
    });
  };
export const loginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    await loginApi(data).then((res: any) => {
      if (res.status === "success") dispatch({ type: LOGIN, payload: res });
    });
    // // 暫時直接登入
    // await dispatch({
    //   type: LOGIN,
    //   payload: { email: "string", password: "string", name: "string" },
    // });
  };

export const loginJwtAction =
  (token: string) => async (dispatch: (arg: any) => any) => {
    await loginGoogleJWT(token).then((res: any) => {
      if (res.status === "success")
        dispatch({ type: LOGIN, payload: res.data });
    });
  };
