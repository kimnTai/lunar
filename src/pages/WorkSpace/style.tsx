import { Card } from "antd";
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
