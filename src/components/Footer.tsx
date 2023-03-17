import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

const FooterCss = styled(Layout.Footer)<{ showNavbar: boolean }>`
  margin-left: ${(props) => (props.showNavbar ? "0px" : "200px")};
  transition: all 0.2s ease;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const Footer: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {
  return <FooterCss showNavbar={showNavbar}>Footer</FooterCss>;
};

export default Footer;
