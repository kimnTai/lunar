import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  NewOrganizationFormProps,
  OrganizationProps,
  UpdateOrganizationMemberProps,
  UpdateOrganizationProps,
} from "@/interfaces/organization";
import {
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
  "organization/getOrganizationByIdAction",
  async (organizationId: string) =>
    await getOrganizationByIdApi({ organizationId })
);

export const newOrganizationAction = createAsyncThunk(
  "organization/newOrganizationAction",
  async (data: NewOrganizationFormProps) => await newOrganizationApi(data)
);

export const updateOrganizationAction = createAsyncThunk(
  "organization/updateOrganizationAction",
  async (data: UpdateOrganizationProps) => await updateOrganizationApi(data)
);

export const updateOrganizationMemberAction = createAsyncThunk(
  "organization/updateOrganizationMemberAction",
  async (data: UpdateOrganizationMemberProps) =>
    await updateOrganizationMemberApi(data)
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizationsAction.fulfilled, (state, action) => {
      state.organization = action.payload.result;
    });

    builder.addCase(getOrganizationByIdAction.fulfilled, (state, action) => {
      const newOrganization = state.organization.map((value) => {
        if (value._id === action.payload.result._id) {
          return action.payload.result;
        }
        return value;
      });
      state.organization = newOrganization;
    });

    builder.addCase(newOrganizationAction.fulfilled, (state, action) => {
      state.organization = [...state.organization, action.payload.result];
    });

    builder.addCase(updateOrganizationAction.fulfilled, (state, action) => {
      const newOrganization = state.organization.map((value) => {
        if (value._id === action.payload.result._id) {
          return action.payload.result;
        }
        return value;
      });
      state.organization = newOrganization;
    });

    builder.addCase(
      updateOrganizationMemberAction.fulfilled,
      (state, action) => {
        const newOrganization = state.organization.map((value) => {
          if (value._id === action.payload.result._id) {
            return action.payload.result;
          }
          return value;
        });
        state.organization = newOrganization;
      }
    );
  },
});

export const {} = organizationSlice.actions;

export const selectOrganization = (state: RootState) =>
  state.organization.organization;

export default organizationSlice.reducer;
