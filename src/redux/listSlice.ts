import {
  cloneListApi,
  closeListAllCardsApi,
  moveListApi,
  newListApi,
  updateListApi,
} from "@/api/lists";
import {
  CloneListProps,
  MoveListProps,
  NewListProps,
  UpdateListProps,
} from "@/interfaces/lists";
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

export const moveListAction = createAsyncThunk(
  "list/moveListAction",
  async (data: MoveListProps) => await moveListApi(data)
);

export const cloneListAction = createAsyncThunk(
  "list/moveListAction",
  async (data: CloneListProps) => await cloneListApi(data)
);

export const selectListById = (listId?: string) => (state: RootState) =>
  state.board.board.list.find(({ _id }) => _id === listId);
