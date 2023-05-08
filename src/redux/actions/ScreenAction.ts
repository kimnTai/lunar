import CONSTANTS from "../constants";

interface ScreenActionProps {
  type: string;
}

export const openNavbarAction =
  () => async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: CONSTANTS.OPEN_CLOSE_NAVBAR });
  };

export const changeWorkSpaceAction =
  () => async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: CONSTANTS.CHANGE_WORK_SPACE });
  };
