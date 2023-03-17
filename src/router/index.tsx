import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Home } from "@/pages/Home";
import { connect } from "react-redux";
import { clickNextAction } from "@/redux/actions/NavbarAction";
import Navbar from "@/components/Navbar";
import MainLayoutCss from "@/components/MainLayoutCss";

const AppRouter: React.FC<any> = (props) => {
  const { openNav, showNavbar } = props;
  return (
    <>
      <BrowserRouter>
        <Header openNav={openNav} />
        <Navbar showNavbar={showNavbar} />
        <MainLayoutCss showNavbar={showNavbar}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainLayoutCss>
        <Footer showNavbar={showNavbar} />
      </BrowserRouter>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  showNavbar: state.navbar.showNavbar,
});
export default connect(mapStateToProps, {
  openNav: clickNextAction,
})(AppRouter);
