import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConnectedProps } from "react-redux";
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
import { connector } from "@/redux/connector";
import LoginLayout from "./LoginLayout";

export type PropsFromRedux = ConnectedProps<typeof connector>;

const AppRouter: React.FC<PropsFromRedux> = (props) => {
  const {
    login,
    loginAction,
    loginJwt,
    signInAction,
    changeWorkSpace,
    organization,
    getOrganization,
  } = props;

  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoad(true);
      (async () => {
        await loginJwt().catch(() => setLoad(false));
        await getOrganization().catch(() => setLoad(false));
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
          <Route
            path="/login/:callback"
            element={
              <Callback loginJwt={loginJwt} getOrganization={getOrganization} />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                signInAction={signInAction}
                loginAction={loginAction}
                isSignUpPage={false}
                getOrganization={getOrganization}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Login
                signInAction={signInAction}
                loginAction={loginAction}
                isSignUpPage={true}
                getOrganization={getOrganization}
              />
            }
          />
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
              <Route
                path={"/workspace/new"}
                element={<NewWorkSpace getOrganization={getOrganization} />}
              />
              <Route
                index
                path={`/workspace/:workSpaceId/home`}
                element={
                  <LoginLayout
                    getOrganization={getOrganization}
                    changeWorkSpace={changeWorkSpace}
                    children={
                      <WorkSpace
                        setWorkSpace={changeWorkSpace}
                        getOrganization={getOrganization}
                      />
                    }
                  />
                }
              />
              <Route
                path={`/workspace/:workSpaceId/members`}
                element={
                  <LoginLayout
                    getOrganization={getOrganization}
                    changeWorkSpace={changeWorkSpace}
                    children={
                      <WorkSpaceMember
                        setWorkSpace={changeWorkSpace}
                        getOrganization={getOrganization}
                      />
                    }
                  />
                }
              />
              <Route
                path={`/workspace/:workSpaceId/setting`}
                element={
                  <LoginLayout
                    getOrganization={getOrganization}
                    changeWorkSpace={changeWorkSpace}
                    children={
                      <WorkSpaceSetting
                        setWorkSpace={changeWorkSpace}
                        getOrganization={getOrganization}
                      />
                    }
                  />
                }
              />
              <Route
                path="/board/:boardId"
                element={
                  <LoginLayout
                    getOrganization={getOrganization}
                    changeWorkSpace={changeWorkSpace}
                    children={<Billboard setWorkSpace={changeWorkSpace} />}
                  />
                }
              />
            </>
          )}
        </>
      )}
    </Routes>
  );
};

export default connector(React.memo(AppRouter));
