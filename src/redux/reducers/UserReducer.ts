import CONSTANTS from "../constants";
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
  action: {
    type: string;
    payload:
      | PrometheusResponseWithToken<UserProps>
      | PrometheusResponse<OrganizationProps[]>["result"];
  }
) {
  switch (action.type) {
    case CONSTANTS.GET_USER: {
      if ("token" in action.payload) {
        return {
          user: { ...action.payload.result },
          token: action.payload.token,
        };
      }
      break;
    }
    case CONSTANTS.GET_ORGANIZATION: {
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          organization: [...action.payload],
        };
      }
      break;
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
