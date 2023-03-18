import { OPEN_CLOSE_NAVBAR } from "../constants";

const initialState: { showNavbar: boolean } = {
  showNavbar: false,
};

const NavbarReducer = function (
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case OPEN_CLOSE_NAVBAR: {
      return {
        showNavbar: !state.showNavbar,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default NavbarReducer;
