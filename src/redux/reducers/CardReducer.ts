import { CREATE_CARD_LIST } from "../constants";
import { CardReducerProps } from "@/interfaces/trelloCard";
const initialState: CardReducerProps = {
  cardList: [
    {
      id: "a",
      title: "test1",
      children: [
        { id: "c", title: "useArdA" },
        { id: "d", title: "useArdB" },
      ],
    },
    { id: "b", title: "test2", children: [] },
  ],
};

const CardReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case CREATE_CARD_LIST: {
      const id = (Math.random() + new Date().getTime())
        .toString(32)
        .slice(0, 8);
      const useObj = { id, title: action.payload, children: [] };
      return {
        cardList: [...state.cardList, useObj],
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
