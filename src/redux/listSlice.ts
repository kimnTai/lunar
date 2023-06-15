import { closeListAllCardsApi, newListApi, updateListApi } from "@/api/lists";
import { NewListProps, UpdateListProps } from "@/interfaces/lists";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const newListApiAction = createAsyncThunk(
  "list/newList",
  async (data: NewListProps) => await newListApi(data)
);

export const updateListAction = createAsyncThunk(
  "list/updateList",
  async (data: UpdateListProps) => await updateListApi(data)
);

export const closeListAction = createAsyncThunk(
  "list/closeList",
  async (listId: string) => await updateListApi({ listId, closed: true })
);

export const closeListAllCardsAction = createAsyncThunk(
  "list/updateList",
  async (listId: string) => await closeListAllCardsApi(listId)
);

// TODO:卡片拖曳更新
export const updateColumnAction = createAsyncThunk(
  "list/updateColumnAction",
  async (_data: UpdateListProps, _thunkAPI) => {}
);

export const selectListById = (listId?: string) => (state: RootState) =>
  state.board.board.list.find(({ _id }) => _id === listId);
