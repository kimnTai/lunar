import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  showWorkSpace: true,
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    changeWorkSpace: (state, action: PayloadAction<boolean | undefined>) => {
      state.showWorkSpace = action.payload
        ? action.payload
        : !state.showWorkSpace;
    },
  },
});

export const { changeWorkSpace } = screenSlice.actions;

export const selectShowWorkSpace = (state: RootState) =>
  state.screen.showWorkSpace;

export default screenSlice.reducer;
