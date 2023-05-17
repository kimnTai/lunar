import CONSTANTS from "../constants";
import type { UserProps, LoginProps } from "@/interfaces/user";
import { loginApi, signInApi, loginJwtApi } from "@/api/auth";
import { openNotification } from "@/utils/openNotification";

interface LoginActionProps {
  type: string;
  payload?: PrometheusResponse<UserProps>;
}

export const signInAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    const res = await signInApi(data);

    if (res.status === "success") {
      dispatch({ type: CONSTANTS.GET_USER, payload: res });
      dispatch({ type: CONSTANTS.LOGIN, payload: res });
    }
  };

export const loginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    const res = await loginApi(data);

    if (res.status === "success") {
      dispatch({ type: CONSTANTS.GET_USER, payload: res });
      dispatch({ type: CONSTANTS.LOGIN, payload: res });
    }
  };

export const loginJwtAction =
  () => async (dispatch: ({ type, payload }: LoginActionProps) => void) => {
    await loginJwtApi()
      .then((res) => {
        if (res.status === "success") {
          dispatch({ type: CONSTANTS.LOGIN, payload: res });
        }
      })
      .catch(() => {
        dispatch({ type: CONSTANTS.LOGOUT });
      });
  };
