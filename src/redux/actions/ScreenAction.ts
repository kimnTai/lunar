import CONSTANTS from "../constants";

interface ScreenActionProps {
  type: string;
}

export const changeWorkSpaceAction =
  () => async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: CONSTANTS.CHANGE_WORK_SPACE });
  };
