import { getOrganizationsApi } from "@/api/organization";
import { GET_ORGANIZATION } from "../constants";

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
        dispatch({ type: GET_ORGANIZATION, payload: res.result });
    });
  };
