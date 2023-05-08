import CONSTANTS from "../constants";

const initialState = {
  login: false,
};

export default function AuthReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case CONSTANTS.LOGIN: {
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
    case CONSTANTS.LOGOUT: {
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
}
