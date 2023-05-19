import CONSTANTS from "../constants";

const initialState = {
  showNavbar: false,
  showWorkSpace: true,
};

export default function ScreenReducer(
  state = initialState,
  action: { type: string }
) {
  switch (action.type) {
    case CONSTANTS.OPEN_CLOSE_NAVBAR: {
      return {
        ...state,
        showNavbar: !state.showNavbar,
      };
    }
    case CONSTANTS.CHANGE_WORK_SPACE: {
      return {
        ...state,
        showWorkSpace: !state.showWorkSpace,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
