import thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";

export const store = legacy_createStore(RootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
