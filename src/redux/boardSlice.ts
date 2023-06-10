import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddBoardsMembers,
  BoardsProps,
  CloneBoardProps,
  NewBoardsProps,
  updateBoardProps,
} from "@/interfaces/boards";
import {
  addBoardMembersApi,
  deleteBoardApi,
  getBoardApi,
  newBoardApi,
  postCloneBoardApi,
  updateBoardApi,
} from "@/api/boards";
import { RootState } from "./store";
import { newListApiAction } from "./listSlice";
import {
  deleteAttachmentAction,
  newAttachmentAction,
  updateCardAction,
} from "./cardSlice";

const initialState: {
  board: BoardsProps;
} = {
  board: {
    id: "",
    _id: "",
    name: "",
    permission: "",
    closed: false,
    inviteLink: "",
    organizationId: "",
    createdAt: "",
    updatedAt: "",
    image: "",
    member: [],
    list: [],
    label: [],
  },
};

export const getBoardByIdAction = createAsyncThunk(
  "board/getBoardById",
  async (id: string) => await getBoardApi(id)
);

export const newBoardAction = createAsyncThunk(
  "board/newBoard",
  async (data: NewBoardsProps) => await newBoardApi(data)
);

export const updateBoardAction = createAsyncThunk(
  "board/updateBoard",
  async (data: updateBoardProps) => await updateBoardApi(data)
);

export const deleteBoardAction = createAsyncThunk(
  "board/deleteBoard",
  async (id: string) => await deleteBoardApi(id)
);

export const addBoardMembersAction = createAsyncThunk(
  "board/addBoardMembers",
  async (data: AddBoardsMembers) => await addBoardMembersApi(data)
);

export const postCloneBoardAction = createAsyncThunk(
  "board/newBoard",
  async (data: CloneBoardProps) => await postCloneBoardApi(data)
);

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateColumn: (state, action: PayloadAction<boolean | undefined>) => {
      state.board.list;
      action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardByIdAction.fulfilled, (state, action) => {
      state.board = action.payload.result;
    });
    builder.addCase(addBoardMembersAction.fulfilled, (state, action) => {
      state.board = action.payload.result;
    });
    builder.addCase(updateBoardAction.fulfilled, (state, action) => {
      if (state.board._id === action.payload.result._id) {
        state.board = action.payload.result;
      }
    });
    builder.addCase(newListApiAction.fulfilled, (state, action) => {
      const newList = action.payload.result;
      if (state.board._id === newList.boardId) {
        state.board.list.push(newList);
      }
    });
    builder.addCase(updateCardAction.fulfilled, (state, action) => {
      const updateCard = action.payload.result;
      state.board.list
        .filter(({ _id }) => _id === updateCard.listId)
        .forEach((list) => {
          list.card = list.card.map((value) =>
            value._id === updateCard._id ? updateCard : value
          );
        });
    });
    builder.addCase(newAttachmentAction.fulfilled, (state, action) => {
      const attachment = action.payload.result;

      const card = state.board.list
        .flatMap(({ card }) => card)
        .find(({ _id }) => _id === attachment.cardId);

      if (card) {
        card.attachment = [...card.attachment, attachment];
      }
    });
    builder.addCase(deleteAttachmentAction.fulfilled, (state, action) => {
      const attachment = action.payload.result;

      const card = state.board.list
        .flatMap(({ card }) => card)
        .find(({ _id }) => _id === attachment.cardId);

      if (card) {
        card.attachment = card.attachment.filter(
          ({ _id }) => _id !== attachment._id
        );
      }
    });
  },
});

export const {} = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board.board;

export const selectBoardManagers = (state: RootState) =>
  state.board.board.member.filter(({ role }) => role === "manager");

export const selectListByCardId = (cardId?: string) => (state: RootState) =>
  state.board.board.list.find(({ card }) =>
    card.find(({ _id }) => _id === cardId)
  );

export default boardSlice.reducer;
