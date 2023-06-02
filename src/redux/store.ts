import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "./screenSlice";
import userReducer from "./userSlice";
import organizationReducer from "./organizationSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    user: userReducer,
    organization: organizationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
