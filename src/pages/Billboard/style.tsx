import { Layout, Row } from "antd";
import styled from "styled-components";
import { media } from "@/assets/constants";

export const BillboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export const MainLayoutCss = styled(Layout.Content)`
  transition: all 0.2s ease;
  height: calc(100vh - 64px);
  background-color: gray;
  padding: 10px;
`;

export const Sider = styled(Layout.Sider)`
  width: 260px;
  position: fixed;
  overflow: visible;
  /* right: 0; */
  transition: all 0.2s ease;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  background-color: var(--dark);
  .title {
    border: 1px solid #dfe1e6;
    padding: 8px 12px 8px;
    font-size: 14px;
    color: white;
    .colorBox {
      width: 40px;
      height: 40px;
      background-color: gray;
      border-radius: 5px;
    }
  }
  /* @media only screen and ${media.md} {
    right: unset;
    left: 0;
  }
  @media only screen and ${media.xl} {
  } */
`;

export const HeaderCss = styled(Row)`
  padding: 4px 6px;
  height: 56px;
  background-color: var(--dark);
  .headerFunc {
    padding-right: 10px;
  }
  .serch {
    width: 200px;
  }
  .logo {
    height: 44px;
    width: 140px;
  }
`;
