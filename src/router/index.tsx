import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billboard from "@/pages/Billboard";
import { connect } from "react-redux";
import { openNavbarAction } from "@/redux/actions/NavbarAction";
import { addCardListAction } from "@/redux/actions/CardAction";
import Login from "@/pages/Login";
import {
  signInAction,
  loginAction,
  loginGoogleJwtAction,
  loginJwtAction,
} from "@/redux/actions/AuthAction";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";

const AppRouter: React.FC<any> = (props) => {
  const {
    openNav,
    showNavbar,
    card,
    login,
    loginAction,
    loginGoogle,
    loginJwt,
    signInAction,
  } = props;
  console.log(login);
  useEffect(() => {
    if (localStorage.getItem("token")) loginJwt();
  }, [localStorage.getItem("token")]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!login && <Route path="/" element={<Home />}></Route>}
          <Route
            path="/signup"
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
            path="/login"
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
            <Route
              path="/"
              element={
                <Billboard
                  data={card}
                  openNav={openNav}
                  showNavbar={showNavbar}
                />
              }
            />
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  showNavbar: state.navbar.showNavbar,
  card: state.card.cardList,
  login: state.auth.login,
});
export default connect(mapStateToProps, {
  openNav: openNavbarAction,
  addCardList: addCardListAction,
  signInAction,
  loginAction,
  loginGoogle: loginGoogleJwtAction,
  loginJwt: loginJwtAction,
})(AppRouter);
