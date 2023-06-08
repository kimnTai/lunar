import { updateCardApi } from "@/api/cards";
import { UpdateCardProps } from "@/interfaces/cards";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateCardAction = createAsyncThunk(
  "card/updateCard",
  async (data: UpdateCardProps) => await updateCardApi(data)
);
