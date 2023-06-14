import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  showWorkSpace: true,
  spinning: true,
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
    setSpinning: (state, action: PayloadAction<boolean>) => {
      state.spinning = action.payload;
    },
  },
});

export const { changeWorkSpace, setSpinning } = screenSlice.actions;

export const selectShowWorkSpace = (state: RootState) =>
  state.screen.showWorkSpace;

export const selectSpinning = (state: RootState) => state.screen.spinning;

export default screenSlice.reducer;
