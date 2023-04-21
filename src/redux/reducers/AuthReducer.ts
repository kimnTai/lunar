import { LOGIN } from "../constants";

const initialState: { login: boolean } = {
  login: false,
};

const AuthReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        login: true,
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