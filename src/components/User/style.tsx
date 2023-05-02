import { Layout, Row, Card } from "antd";
import styled from "styled-components";
import { media } from "@/assets/constants";

export const Sider = styled(Layout.Sider)`
  position: fixed;
  overflow: visible;
  /* right: 0; */
  transition: all 0.2s ease;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  border-right: 1px solid var(--grayd5);
  .logo {
    width: 140px;
    height: 32px;
  }
  .title {
    padding: 20px 12px;
    font-size: 14px;
    color: white;
    .colorBox {
      width: 40px;
      height: 40px;
      background-color: gray;
      border-radius: 5px;
    }
  }
  .ant-menu {
    padding: 8px 12px;
    .ant-menu-submenu-title {
      padding: 0;
      margin: 0;
      height: 48px;
      font-weight: bold;
    }
    .ant-menu-title-content {
      margin-left: 12px;
    }
    .ant-menu-submenu-selected > div {
      background-color: var(--graye9);
      color: black;
    }
    .ant-menu-inline {
      margin: 8px 0;
      background-color: white;
    }
    .ant-menu-item-selected {
      background-color: var(--blue);
      color: white;
    }
    .ant-menu-item-only-child {
      margin-bottom: 4px;
    }
  }
  /* @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }
  @media only screen and ${media.xl} {
  } */
`;

export const HeaderCss = styled(Layout.Header)`
  padding: 16px 48px 12px;
  height: 72px;
  border-bottom: 1px solid var(--grayd4);
  .headerFunc {
    padding-right: 10px;
  }
  .serch {
    padding: 12px 16px;
    width: 500px;
    height: 44px;
    background-color: var(--graye9);
    border-radius: 8px;
    .ant-input-prefix {
      margin-left: 14px;
    }
    input {
      background-color: var(--graye9);
    }
  }
`;
