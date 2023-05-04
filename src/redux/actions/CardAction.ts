import { CREATE_CARD_LIST } from "../constants";

interface CreateCardProps {
  type: string;
  payload: string;
}


export const addCardListAction =
  (title: string) =>
  async (dispatch: (arg: CreateCardProps) => CreateCardProps) => {
    dispatch({ type: CREATE_CARD_LIST, payload: title });
  };

