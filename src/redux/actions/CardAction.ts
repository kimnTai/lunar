import { CREATE_CARD_LIST } from "../constants";
import { getOrganizationsApi } from "@/api/organization";

interface CreateCardProps {
  type: string;
  payload: string;
}

interface GetCardListProps {
  type: string;
  payload: string;
}

export const addCardListAction =
  (title: string) =>
  async (dispatch: (arg: CreateCardProps) => CreateCardProps) => {
    dispatch({ type: CREATE_CARD_LIST, payload: title });
  };

export const getOrganizationsAction =
  (userId: string) =>
  async (dispatch: (arg: CreateCardProps) => CreateCardProps) => {
    await getOrganizationsApi(userId).then((res) => {
      console.log(res);
    });
    // dispatch({ type: CREATE_CARD_LIST, payload: userId });
  };
