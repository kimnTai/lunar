import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, loginJwtApi, signInApi } from "@/api/auth";
import { LoginProps, UserProps } from "@/interfaces/user";
import { RootState } from "./store";

const initialState: {
  token: string;
  user: UserProps;
} = {
  token: "",
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
};

export const signInAction = createAsyncThunk(
  "user/signIn",
  async (data: LoginProps) => await signInApi(data)
);

export const loginAction = createAsyncThunk(
  "user/login",
  async (data: LoginProps) => await loginApi(data)
);

export const loginJwtAction = createAsyncThunk(
  "user/loginJwt",
  async () => await loginJwtApi()
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    [signInAction, loginAction, loginJwtAction].forEach((actionCreator) => {
      builder
        .addCase(actionCreator.fulfilled, (state, action) => {
          state.user = action.payload.result;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        })
        .addCase(actionCreator.rejected, (state) => {
          state.token = "";
          localStorage.removeItem("token");
        });
    });
  },
});

export const { logout } = userSlice.actions;

export const selectAuth = (state: RootState) => Boolean(state.user.token);

export default userSlice.reducer;
