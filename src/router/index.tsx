import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import {
  changeWorkSpaceAction,
  openNavbarAction,
} from "@/redux/actions/ScreenAction";
import { addCardListAction } from "@/redux/actions/CardAction";
import { getOrganizationsAction } from "@/redux/actions/OrganizationAction";
import {
  signInAction,
  loginAction,
  loginJwtAction,
} from "@/redux/actions/AuthAction";
import { Header } from "@/components/User/Header";
import { Navbar } from "@/components/User/Navbar";
import Home from "@/pages/Home";
import { MainLayoutCss } from "@/pages/Billboard/style";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import WorkSpace from "@/pages/WorkSpace";
import Billboard from "@/pages/Billboard";
import NewWorkSpace from "@/pages/WorkSpace/NewWorkSpace";
import SpinPage from "@/pages/SpinPage";
import Callback from "@/pages/Login/Callback";

const AppRouter: React.FC<any> = (props) => {
  const {
    openNav,
    showNavbar,
    login,
    loginAction,
    loginJwt,
    signInAction,
    showWorkSpace,
    changeWorkSpace,
    organization,
    getOrganization,
  } = props;

  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoad(true);
      (async () => {
        await loginJwt();
        await getOrganization();
        setLoad(false);
      })();
    } else {
      setLoad(false);
    }
  }, [login, organization?.length]);

  const LoginLayout = React.memo(({ children }: any) => (
    <Layout>
      <Navbar
        showNavbar={showNavbar}
        openNav={openNav}
        workSpace={showWorkSpace}
        setWorkSpace={changeWorkSpace}
        getOrganization={getOrganization}
      />
      <Layout>
        <Header workSpace={showWorkSpace} />
        <MainLayoutCss workspace={showWorkSpace.toString()}>
          {children}
        </MainLayoutCss>
      </Layout>
    </Layout>
  ));

  return (
    <HashRouter>
      <Routes>
        {load && <Route path="*" element={<SpinPage />} />}
        {!load && (
          <>
            {!login && <Route path="/" element={<Home />}></Route>}

            <Route
              path="/login/:callback"
              element={
                <Callback
                  loginJwt={loginJwt}
                  getOrganization={getOrganization}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login
                  signInAction={signInAction}
                  loginAction={loginAction}
                  login={login}
                  signIn={false}
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
                  login={login}
                  signIn={true}
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
                      <Navigate to={`/workspace/${organization[0]._id}/home`} />
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
                  path="/board/:boardId"
                  element={
                    <LoginLayout
                      children={
                        <Billboard
                          workSpace={showWorkSpace}
                          setWorkSpace={changeWorkSpace}
                        />
                      }
                    />
                  }
                />
              </>
            )}
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

const mapStateToProps = (state: any) => ({
  showNavbar: state.screen.showNavbar,
  showWorkSpace: state.screen.showWorkSpace,
  login: state.auth.login,
  organization: state.user.organization,
});

export default connect(mapStateToProps, {
  openNav: openNavbarAction,
  changeWorkSpace: changeWorkSpaceAction,
  addCardList: addCardListAction,
  signInAction,
  loginAction,
  loginJwt: loginJwtAction,
  getOrganization: getOrganizationsAction,
})(React.memo(AppRouter));
