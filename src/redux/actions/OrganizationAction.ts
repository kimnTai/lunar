import { getUserOrganizationsApi } from "@/api/organization";
import CONSTANTS from "../constants";
import { OrganizationProps } from "@/interfaces/organization";

interface GetOrganizationsListProps {
  type: string;
  payload: PrometheusResponse<OrganizationProps[]>["result"];
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
