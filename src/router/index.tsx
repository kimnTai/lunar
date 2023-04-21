import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billboard from "@/pages/Billboard";
import { connect } from "react-redux";
import { openNavbarAction } from "@/redux/actions/NavbarAction";
import { addCardListAction } from "@/redux/actions/CardAction";
import Login from "@/pages/Login";
import { LoginAction } from "@/redux/actions/AuthAction";
import Home from "@/pages/Home";

const AppRouter: React.FC<any> = (props) => {
  const { openNav, showNavbar, card, login, loginAction } = props;
  console.log(login);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!login && <Route path="/" element={<Home />}></Route>}
          <Route path="/login" element={<Login loginAction={loginAction} />} />
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
  loginAction: LoginAction,
})(AppRouter);
