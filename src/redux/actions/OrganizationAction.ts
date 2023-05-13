import { getOrganizationsApi } from "@/api/organization";
import CONSTANTS from "../constants";

interface GetOrganizationsListProps {
  type: string;
  payload: string;
}

export const getOrganizationsAction =
  () =>
  async (
    dispatch: (arg: GetOrganizationsListProps) => GetOrganizationsListProps
  ) => {
    const res = await getOrganizationsApi();

    if (res.status === "success") {
      dispatch({ type: CONSTANTS.GET_ORGANIZATION, payload: res.result });
    }
  };
