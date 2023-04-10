import { combineReducers } from "redux";
import NavbarReducer from "./NavbarReducer";
import CardReducer from "./CardReducer";
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
  navbar: NavbarReducer,
  card: CardReducer,
  auth: AuthReducer,
});

export default RootReducer;
