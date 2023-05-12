import { Card, Layout } from "antd";
import styled from "styled-components";

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
    background-color: "#232323";
    color: "white";
  }
`;

export const WorkSpaceMemberCss = styled.div`
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: 0px;
  }
  h3 {
    color: var(--black23);
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
  }
  .intro-col {
    h4 {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 12px;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .ant-list-item-action-split {
    display: none;
  }
`;

export const WorkSpaceCardCss = styled(Card)<{ backgroundurl: string }>`
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

export const NewWorkSpaceCss = styled(Layout)`
  position: relative;
  height: calc(100% - 80px);
  .bg-left {
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  h1 {
    line-height: 120%;
    font-size: 32px;
    font-weight: 700;
    color: var(--black23);
  }
  .ant-form-item-label {
    font-weight: bold;
  }
`;
