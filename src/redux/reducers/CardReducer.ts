import { CREATE_CARD_LIST } from "../constants";
import { CardReducerProps } from "@/interfaces/card";
const initialState: CardReducerProps = {
  cardList: [
    { id: "a", title: "test1" },
    { id: "b", title: "test2" },
  ],
};

const CardReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case CREATE_CARD_LIST: {
      return {
        cardList: [...state.cardList, ...action.payload],
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default CardReducer;
