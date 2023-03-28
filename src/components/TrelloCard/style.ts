import styled from "styled-components";
import { Card } from "antd";

export const TrelloCardStyled = styled(Card)<{ isdargging: string }>`
  width: 276px;

  /* transform: ${(props) =>
    props.isdargging === "true" ? "rotate(10deg)" : "rotate(0deg)"}; */
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
  margin-top: 10px;
  .add-title {
    width: calc(100% - 28px);
  }
  .sample {
    width: 28px;
  }
`;
