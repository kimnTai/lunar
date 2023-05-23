import type { RootState } from "@/redux/store";
import { connect } from "react-redux";
import {
  signInAction,
  loginAction,
  loginJwtAction,
} from "./actions/AuthAction";
import { getOrganizationsAction } from "./actions/OrganizationAction";
import { changeWorkSpaceAction } from "./actions/ScreenAction";

const mapStateToProps = (state: RootState) => ({
  showWorkSpace: state.screen.showWorkSpace,
  login: state.auth.login,
  organization: state.user.organization,
});

export const connector = connect(mapStateToProps, {
  changeWorkSpace: changeWorkSpaceAction,
  signInAction,
  loginAction,
  loginJwt: loginJwtAction,
  getOrganization: getOrganizationsAction,
});
