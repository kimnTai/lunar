import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteOrganizationMemberProps,
  DeleteOrganizationProps,
  NewOrganizationFormProps,
  OrganizationProps,
  UpdateOrganizationMemberProps,
  UpdateOrganizationProps,
  addOrganizationMemberProps,
} from "@/interfaces/organization";
import {
  addOrganizationMemberApi,
  deleteOrganizationApi,
  deleteOrganizationMemberApi,
  generateInviteLinkApi,
  getOrganizationByIdApi,
  getUserOrganizationsApi,
  newOrganizationApi,
  updateOrganizationApi,
  updateOrganizationMemberApi,
} from "@/api/organization";
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
  "organization/getOrganizationById",
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
  async (data: DeleteOrganizationProps) =>
    await deleteOrganizationApi(data).then(() => getUserOrganizationsApi())
);

export const addOrganizationMemberAction = createAsyncThunk(
  "organization/addOrganizationMember",
  async (data: addOrganizationMemberProps) =>
    await addOrganizationMemberApi(data)
);

export const updateOrganizationMemberAction = createAsyncThunk(
  "organization/updateOrganizationMember",
  async (data: UpdateOrganizationMemberProps) =>
    await updateOrganizationMemberApi(data)
);

export const deleteOrganizationMemberAction = createAsyncThunk(
  "organization/deleteOrganizationMember",
  async (data: DeleteOrganizationMemberProps) =>
    await deleteOrganizationMemberApi(data)
);

export const generateInviteLinkAction = createAsyncThunk(
  "organization/generateInviteLink",
  async (organizationId: string) => await generateInviteLinkApi(organizationId)
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizationsAction.fulfilled, (state, { payload }) => {
      state.organization = payload.result;
    });

    builder.addCase(newOrganizationAction.fulfilled, (state, { payload }) => {
      state.organization = [...state.organization, payload.result];
    });

    builder.addCase(
      deleteOrganizationAction.fulfilled,
      (state, { payload }) => {
        state.organization = payload.result;
      }
    );

    const updateOneList = [
      getOrganizationByIdAction,
      updateOrganizationAction,
      updateOrganizationMemberAction,
      addOrganizationMemberAction,
      generateInviteLinkAction,
      deleteOrganizationMemberAction,
    ];
    updateOneList.forEach((actionCreator) => {
      builder.addCase(actionCreator.fulfilled, (state, { payload }) => {
        const newOrganization = state.organization.map((value) => {
          if (value._id === payload.result._id) {
            return payload.result;
          }
          return value;
        });
        state.organization = newOrganization;
      });
    });
  },
});

export const {} = organizationSlice.actions;

export const selectOrganization = (state: RootState) =>
  state.organization.organization;

export default organizationSlice.reducer;
