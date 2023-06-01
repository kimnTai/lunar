import CONSTANTS from "../constants";

interface ScreenActionProps {
  type: string;
  payload: boolean | undefined;
}

export const changeWorkSpaceAction =
  (bool?: boolean) =>
  async (dispatch: (arg: ScreenActionProps) => ScreenActionProps) => {
    dispatch({ type: CONSTANTS.CHANGE_WORK_SPACE, payload: bool });
  };
