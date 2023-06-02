import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, loginJwtApi, signInApi } from "@/api/auth";
import { LoginProps, UserProps } from "@/interfaces/user";
import { RootState } from "./store";
import Cookie from "@/utils/cookie";

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
      Cookie.remove("lunar-token");
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAction.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.token = action.payload.token;
        Cookie.set("lunar-token", action.payload.token);
      })
      .addCase(signInAction.rejected, (state) => {
        state.token = "";
        Cookie.remove("lunar-token");
      });

    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.token = action.payload.token;
        Cookie.set("lunar-token", action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.token = "";
        Cookie.remove("lunar-token");
      });

    builder
      .addCase(loginJwtAction.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.token = action.payload.token;
      })
      .addCase(loginJwtAction.rejected, (state) => {
        state.token = "";
      });
  },
});

export const { logout } = userSlice.actions;

export const selectAuth = (state: RootState) => Boolean(state.user.token);

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
