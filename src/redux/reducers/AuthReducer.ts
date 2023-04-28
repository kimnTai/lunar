import { LOGIN, GOOGLE_LOGIN, LOGOUT } from "../constants";

const initialState: { login: boolean } = {
  login: false,
};

const AuthReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem(
        "token",
        typeof action.payload.token === "string"
          ? action.payload.token
          : JSON.stringify(action.payload.token)
      );
      localStorage.setItem("userData", JSON.stringify(action.payload.result));
      return {
        login: true,
      };
    }
    case GOOGLE_LOGIN: {
      localStorage.setItem(
        "token",
        typeof action.payload.token === "string"
          ? action.payload.token
          : JSON.stringify(action.payload.token)
      );
      localStorage.setItem("userData", JSON.stringify(action.payload.result));
      return {
        login: true,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
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
};

export default AuthReducer;
