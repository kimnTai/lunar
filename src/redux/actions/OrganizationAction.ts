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
    await getOrganizationsApi().then((res: any) => {
      if (res.status === "success")
        dispatch({ type: CONSTANTS.GET_ORGANIZATION, payload: res.result });
    });
  };
