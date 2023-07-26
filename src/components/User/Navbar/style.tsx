import { Layout } from "antd";
import styled from "styled-components";

export const Sider = styled(Layout.Sider)`
  position: fixed;
  overflow: visible;
  transition: all 0.2s ease;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  border-right: 1px solid var(--grayd5);
  .logo {
    width: 140px;
    height: 32px;
    margin-left: 11px;
  }
  .logo2 {
    width: 84px;
    height: 20px;
    margin-left: 4px;
  }
  .logo-div {
    display: flex;
    align-items: center;
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
    .ant-menu-item-active {
      background-color: #bfbfbf !important;
    }
  }
`;
