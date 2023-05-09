import CONSTANTS from "../constants";

interface CreateCardProps {
  type: string;
  payload: string;
}

export const addCardListAction =
  (title: string) =>
  async (dispatch: (arg: CreateCardProps) => CreateCardProps) => {
    dispatch({ type: CONSTANTS.CREATE_CARD_LIST, payload: title });
  };
