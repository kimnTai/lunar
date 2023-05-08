import CONSTANTS from "../constants";
import { type LoginProps } from "@/interfaces/user";
import { loginApi, signInApi, loginJwtApi } from "@/api/auth";

interface LoginActionProps {
  type: string;
  payload: LoginProps;
}

export const signInAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    await signInApi(data).then((res: any) => {
      if (res.status === "success") {
        dispatch({ type: CONSTANTS.GET_USER, payload: res });
        dispatch({ type: CONSTANTS.LOGIN, payload: res });
      }
    });
  };
export const loginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    await loginApi(data).then((res: any) => {
      if (res.status === "success") {
        dispatch({ type: CONSTANTS.GET_USER, payload: res });
        dispatch({ type: CONSTANTS.LOGIN, payload: res });
      }
    });
  };

export const loginJwtAction =
  () =>
  async (
    dispatch: ({ type, payload }: { type: string; payload: any }) => void
  ) => {
    await loginJwtApi().then((res: any) => {
      if (res.status === "success") {
        dispatch({ type: CONSTANTS.LOGIN, payload: res });
      }
    });
  };
