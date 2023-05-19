import CONSTANTS from "../constants";
import type { UserProps } from "@/interfaces/user";

const initialState = {
  login: false,
};

export default function AuthReducer(
  state = initialState,
  action: {
    type: string;
    payload: PrometheusResponseWithToken<UserProps>;
  }
) {
  switch (action.type) {
    case CONSTANTS.LOGIN: {
      localStorage.setItem(
        "token",
        typeof action.payload.token === "string"
          ? action.payload.token
          : JSON.stringify(action.payload.token)
      );

      return {
        login: true,
      };
    }
    case CONSTANTS.LOGOUT: {
      localStorage.removeItem("token");

      return {
        login: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
