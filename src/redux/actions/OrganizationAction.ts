import {
  getOrganizationByIdApi,
  getUserOrganizationsApi,
  updateOrganizationApi,
} from "@/api/organization";
import CONSTANTS from "../constants";
import {
  OrganizationProps,
  UpdateOrganizationProps,
} from "@/interfaces/organization";

interface GetOrganizationsListProps {
  type: string;
  payload: PrometheusResponse<OrganizationProps[]>["result"];
}

interface GetOrganizationsProps {
  type: string;
  payload: PrometheusResponse<OrganizationProps>["result"];
}

export const getOrganizationsAction =
  () =>
  async (
    dispatch: (arg: GetOrganizationsListProps) => GetOrganizationsListProps
  ) => {
    const res = await getUserOrganizationsApi();

    if (res.status === "success") {
      dispatch({ type: CONSTANTS.GET_ORGANIZATION, payload: res.result });
    }
  };

export const getOrganizationByIdAction =
  (organizationId: string) =>
  async (dispatch: (arg: GetOrganizationsProps) => GetOrganizationsProps) => {
    const res = await getOrganizationByIdApi({ organizationId });

    if (res.status === "success") {
      dispatch({
        type: CONSTANTS.UPDATE_ONE_ORGANIZATION,
        payload: res.result,
      });
    }
  };

export const updateOrganizationAction =
  (data: UpdateOrganizationProps) =>
  async (dispatch: (arg: GetOrganizationsProps) => GetOrganizationsProps) => {
    const res = await updateOrganizationApi(data);

    if (res.status === "success") {
      dispatch({
        type: CONSTANTS.UPDATE_ONE_ORGANIZATION,
        payload: res.result,
      });
    }
  };
