import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Billboard from "@/pages/Billboard";
import { connect } from "react-redux";
import { openNavbarAction } from "@/redux/actions/NavbarAction";
import { addCardListAction } from "@/redux/actions/CardAction";
import Navbar from "@/components/Navbar";
import MainLayoutCss from "@/components/MainLayoutCss";

const AppRouter: React.FC<any> = (props) => {
  const { openNav, showNavbar, card } = props;
  return (
    <>
      <BrowserRouter>
        <Header openNav={openNav} />
        <Navbar showNavbar={showNavbar} />
        <MainLayoutCss style={{ marginLeft: showNavbar ? "0px" : "200px" }}>
          <Routes>
            <Route path="/" element={<Billboard data={card} />} />
          </Routes>
        </MainLayoutCss>
        <Footer showNavbar={showNavbar} />
      </BrowserRouter>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  showNavbar: state.navbar.showNavbar,
  card: state.card.cardList,
});
export default connect(mapStateToProps, {
  openNav: openNavbarAction,
  addCardList: addCardListAction,
})(AppRouter);
