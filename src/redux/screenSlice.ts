import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

export default screenSlice.reducer;
