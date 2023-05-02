import { OPEN_CLOSE_NAVBAR, CHANGE_WORK_SPACE } from "../constants";

const initialState: { [x: string]: boolean } = {
  showNavbar: false,
  showWorkSpace: true,
};

const ScreenReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case OPEN_CLOSE_NAVBAR: {
      console.log(state);
      console.log(!state.showNavbar)
      return {
        ...state,
        showNavbar: !state.showNavbar,
      };
    }
    case CHANGE_WORK_SPACE: {
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
