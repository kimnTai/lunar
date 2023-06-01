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
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginJwtAction, selectAuth } from "@/redux/userSlice";
import {
  getOrganizationsAction,
  selectOrganization,
} from "@/redux/organizationSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

const AppRouter: React.FC = () => {
  const organization = useAppSelector(selectOrganization);

  const login = useAppSelector(selectAuth);
  const [load, setLoad] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoad(true);
      (async () => {
        await dispatch(loginJwtAction()).catch(() => setLoad(false));
        await dispatch(getOrganizationsAction()).catch(() => setLoad(false));
        setLoad(false);
      })();
    } else {
      setLoad(false);
    }
  }, []);

  return (
    <Routes>
      {load && <Route path="*" element={<SpinPage />} />}
      {!load && (
        <>
          {!login && <Route path="/" element={<Home />}></Route>}
          <Route
            path="/invitation/:type/:invitationToken"
            element={<Invitation />}
          ></Route>
          <Route path="/login/:callback" element={<Callback />}></Route>
          <Route path="/login" element={<Login isSignUpPage={false} />} />
          <Route path="/signup" element={<Login isSignUpPage={true} />} />
          <Route path="*" element={<ErrorPage />} />
          {login && (
            <>
              {organization?.length ? (
                <Route
                  path={"/"}
                  element={
                    <Navigate
                      to={`/workspace/${organization.at(0)?._id}/home`}
                    />
                  }
                />
              ) : (
                <Route
                  path={"/"}
                  element={<Navigate to={"/workspace/new"} />}
                />
              )}
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
                path="/cards/:cardId"
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
