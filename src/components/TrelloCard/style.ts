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
`;

export const TrelloCardInnerStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const TrelloCardBottomFuncStyled = styled.div<{ show: string }>`
  display: ${(props) => (props.show === "true" ? "none" : "block")};
  height: 37px;
  margin-top: 8px;
  .add-title {
    width: 100%;
  }
  span {
    margin-inline-start: 12px !important;
  }
`;

export const TrelloCardHeaderStyled = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

export const PopoverHeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  justify-content: center;
  .title {
    line-height: 41px;
  }
  .popoverCloseIcon {
    position: absolute;
    top: 5px;
    right: 0px;
  }
  border-bottom: 1px solid var(--divider-gray);
`;

export const PopoverContentStyled = styled.div``;

export const TrelloCardAddCss = styled(Card)<{ useadd: string }>`
  // height: ${(props) => props.useadd === "true" && "1px"};
  min-height: 1px;
  display: ${(props) => (props.useadd === "true" ? "block" : "none")};
  .bottom-func {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
  width: 100%;
  cursor: pointer;
  border-radius: 3px;
  .addCard {
    color: black;
    padding: 6px 4px;
  }
`;
