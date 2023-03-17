import { OPEN_CLOSE_NAVBAR } from "../constants";

const initialState: { showNavbar: boolean } = {
  showNavbar: false,
};

const PBarReducer = function (
  state = initialState,
  action: { type: string; payload: number }
) {
  switch (action.type) {
    case OPEN_CLOSE_NAVBAR: {
      return {
        showNavbar: !state.showNavbar,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default PBarReducer;
