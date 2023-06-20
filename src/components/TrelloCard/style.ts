import styled from "styled-components";
import { Card } from "antd";

export const TrelloCardStyled = styled(Card)<{ isdragging: string }>`
  width: 280px;
  border: 0px;

  .ant-card-meta-title {
    color: white;
  }
  background-color: ${(props) =>
    props.isdragging === "true" ? " var(--gray66)" : "var(--black23)"};

  animation: ${(props) =>
    props.isdragging === "true" && "rotate 0s linear forwards"};

  @keyframes rotate {
    100% {
      transform: rotate(-5.75deg);
    }
  }
  .ant-card-body {
    padding: 8px;
  }
`;

export const ScrollContainer = styled.div<{ internalScroll: boolean }>`
  overflow-x: hidden;
  overflow-y: ${(props) => (props.internalScroll ? "auto" : "hidden")};
  max-height: calc(100vh - 106px);
  &::-webkit-scrollbar {
    width: 9px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--black23);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--gray9f);
    border: 2px solid var(--black23);
  }
`;

export const TrelloCardBottomFuncStyled = styled.div<{ show: string }>`
  display: ${(props) => (props.show === "true" ? "none" : "block")};
  height: 37px;
  margin-top: 8px;
  width: 264px;
  height: 37px;
  .add-title {
    width: 100%;
  }
  .add-title:hover {
    background-color: #404040 !important;
  }
  span {
    margin-inline-start: 12px !important;
  }
`;

export const TrelloCardAddCss = styled(Card)<{ useadd: string }>`
  padding: 8px;
  min-height: 1px;
  background-color: var(--gray66);
  border-radius: 8px;
  display: ${(props) => (props.useadd === "true" ? "block" : "none")};
  .bottom-func {
    margin-top: 8px;
    display: flex;
  }
  width: 100%;
  cursor: pointer;
`;
