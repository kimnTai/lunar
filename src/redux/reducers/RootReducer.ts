import { combineReducers } from "redux";
import ScreenReducer from "./ScreenReducer";
import CardReducer from "./CardReducer";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
  screen: ScreenReducer,
  card: CardReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default RootReducer;
