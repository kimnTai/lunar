import { LOGIN } from "../constants";
import { LoginProps } from "@/interfaces/user";

interface LoginActionProps {
  type: string;
  payload: LoginProps;
}

export const LoginAction =
  (data: LoginProps) =>
  async (dispatch: (arg: LoginActionProps) => LoginActionProps) => {
    dispatch({ type: LOGIN, payload: data });
  };
