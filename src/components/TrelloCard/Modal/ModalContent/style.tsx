import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const ModalStyle: React.CSSProperties = {
  backgroundColor: "var(--modal-background-color)",
  color: "var(--modal-color)",
};

export const ModalContentStyled = styled(Content)`
  .contentDescription {
    display: flex;
    align-items: center;
    font: 14px;
    line-height: 150%;
    margin: 8px;
  }
`;
