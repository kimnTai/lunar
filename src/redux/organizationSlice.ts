import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invitationApi } from "@/api/invitation";
import {
  addOrganizationMemberApi,
  deleteInviteLinkApi,
  deleteOrganizationApi,
  deleteOrganizationMemberApi,
  generateInviteLinkApi,
  getOrganizationByIdApi,
  getUserOrganizationsApi,
  newOrganizationApi,
  updateOrganizationApi,
  updateOrganizationMemberApi,
} from "@/api/organization";
import {
  AddOrganizationMemberProps,
  DeleteOrganizationMemberProps,
  DeleteOrganizationProps,
  NewOrganizationFormProps,
  OrganizationProps,
  UpdateOrganizationMemberProps,
  UpdateOrganizationProps,
} from "@/interfaces/organization";
import {
  deleteBoardAction,
  newBoardAction,
  updateBoardAction,
} from "./boardSlice";
import { RootState } from "./store";

const initialState: {
  organization: OrganizationProps[];
} = {
  organization: [],
};

export const getOrganizationsAction = createAsyncThunk(
  "organization/getOrganization",
  async () => await getUserOrganizationsApi()
);

export const getOrganizationByIdAction = createAsyncThunk(
  "organization/updateOrganization",
  async (organizationId: string) =>
    await getOrganizationByIdApi({ organizationId })
);

export const newOrganizationAction = createAsyncThunk(
  "organization/newOrganization",
  async (data: NewOrganizationFormProps) => await newOrganizationApi(data)
);

export const updateOrganizationAction = createAsyncThunk(
  "organization/updateOrganization",
  async (data: UpdateOrganizationProps) => await updateOrganizationApi(data)
);

export const deleteOrganizationAction = createAsyncThunk(
  "organization/deleteOrganization",
  async (data: DeleteOrganizationProps, thunkAPI) =>
    await deleteOrganizationApi(data).then(() =>
      thunkAPI.dispatch(getOrganizationsAction())
    )
);

export const addOrganizationMemberAction = createAsyncThunk(
  "organization/updateOrganization",
  async (data: AddOrganizationMemberProps) =>
    await addOrganizationMemberApi(data)
);

export const updateOrganizationMemberAction = createAsyncThunk(
  "organization/updateOrganization",
  async (data: UpdateOrganizationMemberProps) =>
    await updateOrganizationMemberApi(data)
);

export const deleteOrganizationMemberAction = createAsyncThunk(
  "organization/updateOrganization",
  async (data: DeleteOrganizationMemberProps) =>
    await deleteOrganizationMemberApi(data)
);

export const generateInviteLinkAction = createAsyncThunk(
  "organization/updateOrganization",
  async (organizationId: string) => await generateInviteLinkApi(organizationId)
);

export const deleteInviteLinkAction = createAsyncThunk(
  "organization/updateOrganization",
  async (organizationId: string) => await deleteInviteLinkApi(organizationId)
);

export const invitationOrganizationAction = createAsyncThunk(
  "organization/invitationOrganization",
  async (invitationToken: string) =>
    await invitationApi({ type: "organizations", invitationToken })
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    removeUserMember: (
      state,
      action: PayloadAction<{ organizationId: string }>
    ) => {
      state.organization = state.organization.filter(
        ({ _id }) => _id !== action.payload.organizationId
      );
    },
  },
  extraReducers: (builder) => {
    // 組織
    builder
      .addCase(getOrganizationsAction.fulfilled, (state, { payload }) => {
        state.organization = payload.result;
      })
      .addCase(newOrganizationAction.fulfilled, (state, { payload }) => {
        state.organization = [...state.organization, payload.result];
      })
      .addCase(updateOrganizationAction.fulfilled, (state, { payload }) => {
        const newOrganization = state.organization.map((value) => {
          if (value._id === payload.result._id) {
            return payload.result;
          }
          return value;
        });
        state.organization = newOrganization;
      })
      .addCase(invitationOrganizationAction.fulfilled, (state, { payload }) => {
        const addOrganization = payload.result;
        state.organization = state.organization.filter(
          ({ _id }) => _id !== addOrganization._id
        );
        if ("board" in addOrganization) {
          state.organization.push(addOrganization);
        }
      });
    // 看板
    builder
      .addCase(newBoardAction.fulfilled, (state, { payload }) => {
        const board = payload.result;
        state.organization
          .find(({ _id }) => _id === board.organizationId)
          ?.board.push(board);
      })
      .addCase(deleteBoardAction.fulfilled, (state, { payload }) => {
        const deleteBoard = payload.result;
        const target = state.organization.find(
          ({ _id }) => _id === deleteBoard.organizationId
        );
        if (target) {
          target.board = target.board.filter(
            ({ _id }) => _id !== deleteBoard._id
          );
        }
      })
      .addCase(updateBoardAction.fulfilled, (state, { payload }) => {
        const updateBoard = payload.result;
        const target = state.organization.find(
          ({ _id }) => _id === updateBoard.organizationId
        );
        if (target) {
          target.board = target.board.map((value) => {
            return value._id === updateBoard._id ? updateBoard : value;
          });
        }
      });
  },
});

export const { removeUserMember } = organizationSlice.actions;

export const selectOrganization = (state: RootState) =>
  state.organization.organization;

export default organizationSlice.reducer;
