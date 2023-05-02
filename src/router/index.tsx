import React, { Children, useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  changeWorkSpaceAction,
  openNavbarAction,
} from "@/redux/actions/ScreenAction";
import {
  addCardListAction,
  getOrganizationsAction,
} from "@/redux/actions/CardAction";
import Login from "@/pages/Login";
import {
  signInAction,
  loginAction,
  loginGoogleJwtAction,
  loginJwtAction,
} from "@/redux/actions/AuthAction";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import { Navbar } from "@/components/User/Navbar";
import WorkSpace from "@/pages/WorkSpace";
import Billboard from "@/pages/Billboard";
import { MainLayoutCss } from "@/pages/Billboard/style";

const AppRouter: React.FC<any> = (props) => {
  const [userId, setUserId] = useState("");
  const {
    user,
    openNav,
    showNavbar,
    card,
    login,
    loginAction,
    loginGoogle,
    loginJwt,
    signInAction,
    showWorkSpace,
    changeWorkSpace,
    getOrganization,
  } = props;
  useEffect(() => {
    if (localStorage.getItem("token")) loginJwt();
    if (login) setUserId(JSON.parse(localStorage.getItem("userData")!)._id);
  }, [localStorage.getItem("token"), login]);

  const LoginLayout = ({ children }: any) => (
    <Layout>
      <Navbar
        showNavbar={showNavbar}
        openNav={openNav}
        workSpace={showWorkSpace}
      />
      <Layout>
        <Header workSpace={showWorkSpace} />
        <MainLayoutCss workspace={showWorkSpace}>{children}</MainLayoutCss>
      </Layout>
    </Layout>
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!login && <Route path="/" element={<Home />}></Route>}
          <Route
            path="/login"
            element={
              <Login
                signInAction={signInAction}
                loginAction={loginAction}
                loginGoogle={loginGoogle}
                login={login}
                signIn={false}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Login
                signInAction={signInAction}
                loginAction={loginAction}
                loginGoogle={loginGoogle}
                login={login}
                signIn={true}
              />
            }
          />
          {login && (
            <>
              <Route
                path={"/"}
                element={
                  <Navigate
                    to={`/w/${
                      JSON.parse(localStorage.getItem("userData")!)._id
                    }/home`}
                  />
                }
              />
              <Route
                index
                path={`/w/:userId/home`}
                element={
                  <LoginLayout
                    children={
                      <WorkSpace
                        setWrokSpace={changeWorkSpace}
                        getOrganization={getOrganization}
                      />
                    }
                  />
                }
              />
              <Route
                path="/b/:boardId"
                element={
                  <LoginLayout
                    children={
                      <Billboard
                        data={card}
                        // showNavbar={showNavbar}
                        setWrokSpace={changeWorkSpace}
                      />
                    }
                  />
                }
              />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  showNavbar: state.screen.showNavbar,
  showWorkSpace: state.screen.showWorkSpace,
  card: state.card.cardList,
  login: state.auth.login,
  user: state.user.user,
});
export default connect(mapStateToProps, {
  openNav: openNavbarAction,
  changeWorkSpace: changeWorkSpaceAction,
  addCardList: addCardListAction,
  signInAction,
  loginAction,
  loginGoogle: loginGoogleJwtAction,
  loginJwt: loginJwtAction,
  getOrganization: getOrganizationsAction,
})(AppRouter);
