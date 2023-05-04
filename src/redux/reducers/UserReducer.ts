import { GET_USER, GET_ORGANIZATION } from "../constants";
import { UserProps } from "@/interfaces/user";
import { OrganizationProps } from "@/interfaces/organization";

const initialState: {
  user: UserProps;
  token: string;
  organization: OrganizationProps[];
} = {
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
  organization: [],
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
    case GET_ORGANIZATION: {
      return {
        ...state,
        organization : [...action.payload]
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
