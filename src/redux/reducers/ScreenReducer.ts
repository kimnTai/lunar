import CONSTANTS from "../constants";

const initialState = {
  showNavbar: false,
  showWorkSpace: true,
};

const ScreenReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case CONSTANTS.OPEN_CLOSE_NAVBAR: {
      console.log(state);
      console.log(!state.showNavbar);
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
};

export default ScreenReducer;
