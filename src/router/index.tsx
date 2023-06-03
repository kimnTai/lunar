import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import WorkSpace from "@/pages/WorkSpace";
import Billboard from "@/pages/Billboard";
import NewWorkSpace from "@/pages/WorkSpace/NewWorkSpace";
import SpinPage from "@/pages/SpinPage";
import Callback from "@/pages/Login/Callback";
import WorkSpaceMember from "@/pages/WorkSpace/WorkSpaceMember";
import WorkSpaceSetting from "@/pages/WorkSpace/WorkSpaceSetting";
import Invitation from "@/pages/InvitationPage";
import LoginLayout from "./LoginLayout";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { loginJwtAction, selectAuth } from "@/redux/userSlice";
import {
  getOrganizationsAction,
  selectOrganization,
} from "@/redux/organizationSlice";
import Cookie from "@/utils/cookie";

const AppRouter: React.FC = () => {
  const organization = useAppSelector(selectOrganization);

  const login = useAppSelector(selectAuth);
  const [spinning, setSpinning] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookie.get("lunar-token")) {
      Promise.all([
        dispatch(loginJwtAction()),
        dispatch(getOrganizationsAction()),
      ]).finally(() => {
        setSpinning(false);
      });
    } else {
      setSpinning(false);
    }
  }, []);

  return (
    <Routes>
      {spinning && <Route path="*" element={<SpinPage />} />}
      {!spinning && (
        <>
          {!login && <Route path="/" element={<Home />}></Route>}
          <Route
            path="/invitation/:type/:invitationToken"
            element={<Invitation />}
          ></Route>
          <Route path="/login/:callback" element={<Callback />}></Route>
          <Route path="/login" element={<Login />} />
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
              <Route path={"/workspace/new"} element={<NewWorkSpace />} />
              <Route
                index
                path={`/workspace/:workSpaceId/home`}
                element={<LoginLayout children={<WorkSpace />} />}
              />
              <Route
                path={`/workspace/:workSpaceId/members`}
                element={<LoginLayout children={<WorkSpaceMember />} />}
              />
              <Route
                path={`/workspace/:workSpaceId/setting`}
                element={<LoginLayout children={<WorkSpaceSetting />} />}
              />
              <Route
                path="/board/:boardId"
                element={<LoginLayout children={<Billboard />} />}
              />
              <Route
                path="/board/:boardId/cards/:cardId"
                element={<LoginLayout children={<Billboard />} />}
              />
            </>
          )}
        </>
      )}
    </Routes>
  );
};

export default React.memo(AppRouter);
