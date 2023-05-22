import CONSTANTS from "../constants";

const initialState = {
  showWorkSpace: true,
};

export default function ScreenReducer(
  state = initialState,
  action: { type: string }
) {
  switch (action.type) {
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
