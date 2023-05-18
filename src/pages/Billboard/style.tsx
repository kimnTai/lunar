import { Button, Layout } from "antd";
import styled from "styled-components";

export const BillboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export const MainLayoutCss = styled(Layout.Content)<{ workspace: string }>`
  transition: all 0.2s ease;
  // height: calc(100vh - 56px);
  background-color: ${(props) =>
    props.workspace === "true" ? "white" : "var(--black23)"};
  padding: 24px 48px;
  overflow-x: auto;
`;

export const BillboardHeaderCss = styled.div`
  margin-bottom: 16px;
  .left-head {
    color: white;
    font-size: 24px;
    font-weight: 700;
    display: flex;
  }
  .right-head {
    display: flex;
    column-gap: 16px;
  }
`;

export const BillboardHeaderBtn = styled(Button)`
  color: white;
  background-color: var(--black23);
  padding: 8px;
  display: flex;
  align-items: center;
  height: 36px;
`;

export const PopoverTitleStyle = styled.div`
  display: flex;
  align-items: cetner;
  justify-content: center;
  position: relative;
`;

export const PopoverContentStyle = styled.div`
  .top-border {
    border-top: 1px solid var(--grayd5);
    padding: 8px 0;
  }
  .listBtn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
