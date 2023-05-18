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

export default function UserReducer(
  state = initialState,
  action: {
    type: string;
    payload:
      | PrometheusResponseWithToken<UserProps>
      | PrometheusResponse<OrganizationProps[]>["result"];
  }
) {
  if (action.type === CONSTANTS.GET_USER && "token" in action.payload) {
    return {
      ...state,
      user: {
        ...action.payload.result,
      },
      token: action.payload.token,
    };
  }

  if (
    action.type === CONSTANTS.GET_ORGANIZATION &&
    Array.isArray(action.payload)
  ) {
    return {
      ...state,
      organization: [...action.payload],
    };
  }

  return {
    ...state,
  };
}
