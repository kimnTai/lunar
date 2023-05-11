import { combineReducers } from "redux";
import ScreenReducer from "./ScreenReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
  screen: ScreenReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default RootReducer;
