import { combineReducers } from "redux";
import NavbarReducer from "./NavbarReducer";

const RootReducer = combineReducers({
  navbar: NavbarReducer,
});

export default RootReducer;
