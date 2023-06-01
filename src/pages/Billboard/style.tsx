import { Layout } from "antd";
import styled from "styled-components";

export const BillboardStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export const MainLayoutCss = styled(Layout.Content)<{ workspace: string }>`
  transition: all 0.2s ease;
  height: calc(100vh - 72px);
  background-color: ${(props) =>
    props.workspace === "true" ? "white" : "var(--black23)"};
  padding: 24px 48px;
  overflow-x: auto;
`;
