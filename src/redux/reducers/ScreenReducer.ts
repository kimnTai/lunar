import CONSTANTS from "../constants";

const initialState = {
  showWorkSpace: true,
};

export default function ScreenReducer(
  state = initialState,
  action: { type: string; payload: boolean | undefined }
) {
  switch (action.type) {
    case CONSTANTS.CHANGE_WORK_SPACE: {
      return {
        ...state,
        showWorkSpace: action.payload ? action.payload : !state.showWorkSpace,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
