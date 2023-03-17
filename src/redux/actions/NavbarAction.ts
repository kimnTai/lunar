import { OPEN_CLOSE_NAVBAR } from "../constants";

interface NavbarActionProps {
  type: string;
}

export const clickNextAction =
  () => async (dispatch: (arg: NavbarActionProps) => NavbarActionProps) => {
    dispatch({ type: OPEN_CLOSE_NAVBAR });
  };
