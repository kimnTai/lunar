import { LOGIN, GOOGLE_LOGIN, LOGOUT } from "../constants";
import { LoginProps } from "@/interfaces/user";
import {
  loginApi,
  loginGoogleApi,
  loginGoogleJWT,
  signInApi,
  loginJwtApi,
  logoutApi,
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
  };

export const loginGoogleJwtAction =
  (token: string) => async (dispatch: (arg: any) => any) => {
    await loginGoogleJWT(token).then((res: any) => {
      if (res.status === "success")
        dispatch({ type: GOOGLE_LOGIN, payload: res });
    });
  };

export const loginJwtAction =
  () =>
  async (
    dispatch: ({ type, payload }: { type: string; payload: any }) => void
  ) => {
    await loginJwtApi().then((res: any) => {
      if (res.status === "success") dispatch({ type: LOGIN, payload: res });
    });
  };

