import { GET_USER } from "../constants";
import { UserProps } from "@/interfaces/user";

const initialState: { user: UserProps; token: string } = {
  user: {
    avatar: "",
    createdAt: "",
    email: "",
    googleId: "",
    isEmailVerification: false,
    name: "",
    updatedAt: "",
    _id: "",
  },
  token: "",
};

const UserReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case GET_USER: {
      return {
        user: { ...action.payload.result },
        token: action.payload.token,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
