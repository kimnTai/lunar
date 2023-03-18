import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { media } from "@/assets/constants";

const Sider = styled(Layout.Sider)`
  position: fixed;
  overflow: visible;
  /* right: 0; */
  transition: all 0.2s ease;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  background-color: var(--dark);
  /* @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }
  @media only screen and ${media.xl} {
  } */
`;

const Navbar: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {
  return (
    <Sider collapsible collapsed={showNavbar} collapsedWidth={0} trigger={null}>
      <div
        style={{
          height: 32,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
    </Sider>
  );
};

export default Navbar;
