import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddBoardsMembers,
  BoardsProps,
  CloneBoardProps,
  NewBoardsProps,
  UpdateBoardProps,
} from "@/interfaces/boards";
import {
  addBoardMembersApi,
  deleteBoardApi,
  generateBoardInviteLinkApi,
  getBoardApi,
  newBoardApi,
  postCloneBoardApi,
  updateBoardApi,
} from "@/api/boards";
import { RootState } from "./store";
import {
  closeListAction,
  moveListAction,
  newListApiAction,
  updateListAction,
} from "./listSlice";
import {
  cloneCardAction,
  closeCardAction,
  deleteAttachmentAction,
  deleteCardCommentAction,
  deleteCardDateAction,
  deleteCheckItemAction,
  deleteChecklistAction,
  moveCardAction,
  newAttachmentAction,
  newCardCommentAction,
  newCheckItemAction,
  newChecklistAction,
  updateCardAction,
  updateCardCommentAction,
  updateCardDateAction,
  updateCheckItemAction,
  updateChecklistAction,
} from "./cardSlice";
import { ListsProps } from "@/interfaces/lists";
import { deleteLabelApi, newLabelApi, updateLabelApi } from "@/api/label";
import {
  DateLabelsProps,
  NewLabelsProps,
  UpdateLabelsProps,
} from "@/interfaces/labels";
import { ChecklistProps } from "@/interfaces/checklists";

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
  async (data: UpdateBoardProps) => await updateBoardApi(data)
);

export const deleteBoardAction = createAsyncThunk(
  "board/deleteBoard",
  async (id: string) => await deleteBoardApi(id)
);

export const addBoardMembersAction = createAsyncThunk(
  "board/getBoardById",
  async (data: AddBoardsMembers) => await addBoardMembersApi(data)
);

export const postCloneBoardAction = createAsyncThunk(
  "board/newBoard",
  async (data: CloneBoardProps) => await postCloneBoardApi(data)
);

export const newLabelAction = createAsyncThunk(
  "board/newLabel",
  async (data: NewLabelsProps) => await newLabelApi(data)
);

export const updateLabelAction = createAsyncThunk(
  "board/updateLabel",
  async (data: UpdateLabelsProps, thunkAPI) =>
    await updateLabelApi(data).then(() =>
      thunkAPI.dispatch(getBoardByIdAction(data.boardId))
    )
);

export const deleteLabelAction = createAsyncThunk(
  "board/deleteLabel",
  async (data: DateLabelsProps, thunkAPI) =>
    await deleteLabelApi(data).then(() =>
      thunkAPI.dispatch(getBoardByIdAction(data.boardId))
    )
);

export const generateBoardInviteLinkAction = createAsyncThunk(
  "board/updateBoard",
  async (boardId: string) => await generateBoardInviteLinkApi(boardId)
);

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardList: (state, action: PayloadAction<ListsProps[]>) => {
      const check = action.payload.reduce(
        (_, { boardId }) => boardId === state.board._id,
        false
      );
      if (check) {
        state.board.list = action.payload;
      }
    },
    setCardChecklist: (
      state,
      action: PayloadAction<{ cardId: string; checklist: ChecklistProps[] }>
    ) => {
      const card = state.board.list
        .flatMap(({ card }) => card)
        .find(({ _id }) => _id === action.payload.cardId);
      if (card) {
        card.checklist = action.payload.checklist;
      }
    },
  },
  extraReducers: (builder) => {
    // 看板
    builder
      .addCase(getBoardByIdAction.fulfilled, (state, action) => {
        state.board = action.payload.result;
      })
      .addCase(updateBoardAction.fulfilled, (state, action) => {
        if (state.board._id === action.payload.result._id) {
          state.board = action.payload.result;
        }
      });
    // 標籤
    builder.addCase(newLabelAction.fulfilled, (state, action) => {
      const label = action.payload.result;
      state.board.label = [...state.board.label, label];
    });
    // 列表
    builder
      .addCase(newListApiAction.fulfilled, (state, action) => {
        const newList = action.payload.result;
        if (state.board._id === newList.boardId) {
          // ws 回傳比 http 快時會出錯，故需判斷是否已存在
          state.board.list = state.board.list.filter(
            ({ _id }) => _id !== newList._id
          );
          state.board.list.push(newList);
        }
      })
      .addCase(updateListAction.fulfilled, (state, action) => {
        const updateList = action.payload.result;
        if (state.board._id === updateList.boardId) {
          state.board.list = state.board.list.filter(
            ({ _id }) => _id !== updateList._id
          );
          state.board.list.push(updateList);
        }
      })
      .addCase(closeListAction.fulfilled, (state, action) => {
        const closedList = action.payload.result;
        if (state.board._id === closedList.boardId) {
          state.board.list = state.board.list.filter(
            ({ _id }) => _id !== closedList._id
          );
        }
      })
      .addCase(moveListAction.fulfilled, (state, action) => {
        const moveList = action.payload.result;
        state.board.list = state.board.list.filter(
          ({ _id }) => _id !== moveList._id
        );
        if (state.board._id === moveList.boardId) {
          state.board.list.push(moveList);
        }
      });
    // 卡片
    builder
      .addCase(updateCardAction.fulfilled, (state, action) => {
        const updateCard = action.payload.result;
        state.board.list
          .filter(({ _id }) => _id === updateCard.listId)
          .forEach((list) => {
            list.card = list.card.map((value) =>
              value._id === updateCard._id ? updateCard : value
            );
          });
      })
      .addCase(cloneCardAction.fulfilled, (state, action) => {
        const cloneCard = action.payload.result;
        state.board.list
          .filter(({ _id }) => _id === cloneCard.listId)
          .forEach((list) => {
            list.card.push(cloneCard);
          });
      })
      .addCase(moveCardAction.fulfilled, (state, action) => {
        const moveCard = action.payload.result;
        if (state.board._id !== moveCard.boardId) {
          return;
        }
        state.board.list.forEach((list) => {
          list.card = list.card.filter(({ _id }) => _id !== moveCard._id);
        });
        state.board.list
          .filter(({ _id }) => _id === moveCard.listId)
          .forEach((list) => {
            list.card.push(moveCard);
          });
      })
      .addCase(closeCardAction.fulfilled, (state, action) => {
        const closedCard = action.payload.result;
        if (state.board._id !== closedCard.boardId) {
          return;
        }
        state.board.list.forEach((list) => {
          list.card = list.card.filter(({ _id }) => _id !== closedCard._id);
        });
      });
    // 卡片附件
    builder
      .addCase(newAttachmentAction.fulfilled, (state, action) => {
        const attachment = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === attachment.cardId);

        if (card) {
          card.attachment = [...card.attachment, attachment];
        }
      })
      .addCase(deleteAttachmentAction.fulfilled, (state, action) => {
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
    // 卡片評論
    builder
      .addCase(newCardCommentAction.fulfilled, (state, action) => {
        const comment = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === comment.cardId);

        if (card) {
          card.comment = [...card.comment, comment];
        }
      })
      .addCase(updateCardCommentAction.fulfilled, (state, action) => {
        const comment = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === comment.cardId);

        if (card) {
          card.comment = card.comment.map((value) =>
            value._id === comment._id ? comment : value
          );
        }
      })
      .addCase(deleteCardCommentAction.fulfilled, (state, action) => {
        const comment = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === comment.cardId);

        if (card) {
          card.comment = card.comment.filter(({ _id }) => _id !== comment._id);
        }
      });
    // 卡片日期
    builder
      .addCase(updateCardDateAction.fulfilled, (state, action) => {
        const date = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === date.cardId);

        if (card) {
          card.date = date;
        }
      })
      .addCase(deleteCardDateAction.fulfilled, (state, action) => {
        const cardId = action.meta.arg;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === cardId);

        if (card) {
          card.date = null;
        }
      });
    // 卡片待辦清單
    builder
      .addCase(newChecklistAction.fulfilled, (state, action) => {
        const checklist = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === checklist.cardId);

        if (card) {
          card.checklist = [...card.checklist, checklist];
        }
      })
      .addCase(updateChecklistAction.fulfilled, (state, action) => {
        const checklist = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === checklist.cardId);

        if (card) {
          card.checklist = card.checklist.map((value) =>
            value._id === checklist._id ? checklist : value
          );
        }
      })
      .addCase(deleteChecklistAction.fulfilled, (state, action) => {
        const checklist = action.payload.result;

        const card = state.board.list
          .flatMap(({ card }) => card)
          .find(({ _id }) => _id === checklist.cardId);

        if (card) {
          card.checklist = card.checklist.filter(
            ({ _id }) => _id !== checklist._id
          );
        }
      });
    // 卡片待辦事項
    builder
      .addCase(newCheckItemAction.fulfilled, (state, action) => {
        const checkItem = action.payload.result;

        const checklist = state.board.list
          .flatMap(({ card }) => card)
          .flatMap(({ checklist }) => checklist)
          .find(({ _id }) => _id === checkItem.checklistId);

        if (checklist) {
          checklist.checkItem = [...checklist.checkItem, checkItem];
        }
      })
      .addCase(updateCheckItemAction.fulfilled, (state, action) => {
        const checklistId =
          action.meta.arg.checklistIdOld ?? action.meta.arg.checklistId;
        const checklist = state.board.list
          .flatMap(({ card }) => card)
          .flatMap(({ checklist }) => checklist)
          .find(({ _id }) => _id === checklistId);
        if (checklist) {
          // 先把舊的濾掉
          checklist.checkItem = checklist.checkItem.filter(
            ({ _id }) => _id !== action.meta.arg.checkItemId
          );
          // 放入更新後的
          const updateCheckItem = action.payload.result;
          checklist.checkItem.push(updateCheckItem);
        }
      })
      .addCase(deleteCheckItemAction.fulfilled, (state, action) => {
        const checkItem = action.payload.result;

        const checklist = state.board.list
          .flatMap(({ card }) => card)
          .flatMap(({ checklist }) => checklist)
          .find(({ _id }) => _id === checkItem.checklistId);

        if (checklist) {
          checklist.checkItem = checklist.checkItem.filter(
            ({ _id }) => _id !== checkItem._id
          );
        }
      });
  },
});

export const { setBoardList, setCardChecklist } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board.board;

export const selectCardList = (state: RootState) =>
  state.board.board.list.flatMap(({ card }) => card);

export const selectBoardManagers = (state: RootState) =>
  state.board.board.member.filter(({ role }) => role === "manager");

export const selectListByCardId = (cardId?: string) => (state: RootState) =>
  state.board.board.list.find(({ card }) =>
    card.find(({ _id }) => _id === cardId)
  );

export const selectLabelById = (labelId?: string) => (state: RootState) =>
  state.board.board.label.find(({ _id }) => _id === labelId);

export default boardSlice.reducer;
