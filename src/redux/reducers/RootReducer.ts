import { combineReducers } from "redux";
import NavbarReducer from "./NavbarReducer";
import CardReducer from "./CardReducer";
const RootReducer = combineReducers({
  navbar: NavbarReducer,
  card: CardReducer,
});

export default RootReducer;
