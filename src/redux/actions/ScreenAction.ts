import { OPEN_CLOSE_NAVBAR, CHANGE_WORK_SPACE } from "../constants";

interface ScreenActionProps {
  type: string;
}

export const openNavbarAction =
  () => async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: OPEN_CLOSE_NAVBAR });
  };

export const changeWorkSpaceAction =
  () => async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: CHANGE_WORK_SPACE });
  };
