import { Layout, Row, Card } from "antd";
import styled from "styled-components";
import { media } from "@/assets/constants";

export const BillboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export const MainLayoutCss = styled(Layout.Content)<{ workspace: string }>`
  transition: all 0.2s ease;
  // height: calc(100vh - 56px);
  background-color: ${(props) =>
    props.workspace === "workSpace" ? "white" : "gray"};
  padding: 24px 48px;
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

export const HeaderCss = styled(Layout.Header)<{ workspace: string }>`
  padding: 16px 48px 12px;
  height: 72px;
  border-bottom: 1px solid var(--grayd4);
  background-color: ${(props) =>
    props.workspace === "workSpace" ? "white" : "var(--gray66)"};
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

export const WorkSpaceCss = styled.div`
  h2 {
    color: #232323;
    font-weight: 700;
    font-size: 28px;
    line-height: 120%;
  }
  .header-icon {
    background-color: #0083ff;
    border: 1px solid #a0d7ff;
    border-radius: 8px;
    width: 72px;
    height: 72px;
    font-size: 32px;
    color: white;
  }
  .add-board-button {
    backgroundcolor: "#232323";
    color: "white";
  }
`;

export const WoarkSpaceCardCss = styled(Card)<{ backgroundurl: string }>`
  background-color: var(--dark); // 暫時使用

  color: white;
  width: 284px;
  height: 160px;
  padding: 16px;
  background-image: url(${(props) => props.backgroundurl});
  .ant-card-body {
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }
`;
