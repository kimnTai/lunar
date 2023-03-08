import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";

export const store = createStore(RootReducer, applyMiddleware(thunk));
