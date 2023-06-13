import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Billboard from "@/pages/Billboard";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Invitation from "@/pages/InvitationPage";
import Login from "@/pages/Login";
import Callback from "@/pages/Login/Callback";
import SpinPage from "@/pages/SpinPage";
import WorkSpace from "@/pages/WorkSpace";
import NewWorkSpace from "@/pages/WorkSpace/NewWorkSpace";
import WorkSpaceMember from "@/pages/WorkSpace/WorkSpaceMember";
import WorkSpaceSetting from "@/pages/WorkSpace/WorkSpaceSetting";
import {
  getOrganizationsAction,
  selectOrganization,
} from "@/redux/organizationSlice";
import { selectSpinning, setSpinning } from "@/redux/screenSlice";
import { loginJwtAction, selectAuth } from "@/redux/userSlice";
import Cookie from "@/utils/cookie";
import LoginLayout from "./LoginLayout";

const AppRouter: React.FC = () => {
  const organization = useAppSelector(selectOrganization);
  const login = useAppSelector(selectAuth);
  const spinning = useAppSelector(selectSpinning);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookie.get("lunar-token")) {
      Promise.all([
        dispatch(loginJwtAction()),
        dispatch(getOrganizationsAction()),
      ]).finally(() => {
        dispatch(setSpinning(false));
      });
    } else {
      dispatch(setSpinning(false));
    }
  }, []);

  return (
    <Routes>
      {spinning && <Route path="*" element={<SpinPage />} />}
      {!spinning && (
        <>
          {!login && <Route path="/" element={<Home />} />}
          <Route
            path="/invitation/:type/:invitationToken"
            element={<Invitation />}
          />
          <Route path="/login" element={<Login />}>
            <Route path="callback" element={<Callback />} />
          </Route>
          <Route path="/signup" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          {login && (
            <>
              <Route
                path={"/"}
                element={
                  <Navigate
                    to={(() => {
                      if (organization?.length) {
                        return `/workspace/${organization.at(0)?._id}/home`;
                      }
                      return "/workspace/new";
                    })()}
                  />
                }
              />
              <Route path="/workspace">
                <Route path="new" element={<NewWorkSpace />} />
                <Route path=":workSpaceId" element={<LoginLayout />}>
                  <Route index path="home" element={<WorkSpace />} />
                  <Route path="members" element={<WorkSpaceMember />} />
                  <Route path="setting" element={<WorkSpaceSetting />} />
                </Route>
              </Route>
              <Route path="/board" element={<LoginLayout />}>
                <Route path=":boardId" element={<Billboard />}>
                  <Route path="cards/:cardId" element={<></>} />
                </Route>
              </Route>
            </>
          )}
        </>
      )}
    </Routes>
  );
};

export default React.memo(AppRouter);
