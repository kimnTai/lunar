import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

const MainLayoutCss = styled(Layout.Content)<{ showNavbar: boolean }>`
  margin-left: ${(props) => (props.showNavbar ? "0px" : "200px")};
  transition: all 0.2s ease;
  height: 100%;
  background-color: gray;
  padding: 10px;
`;

export default MainLayoutCss;
