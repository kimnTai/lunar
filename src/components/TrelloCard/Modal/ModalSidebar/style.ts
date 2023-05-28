import styled from "styled-components";
import { Layout } from "antd";

const { Sider } = Layout;

export const ModalStyle: React.CSSProperties = {
  color: "var(--modal-color)",
  backgroundColor: "#ffffff",
};

export const ModalSidebarStyled = styled(Sider)`
  .button-link {
    background-color: var(--modal-button-neutral);
    border-radius: 3px;
    color: inherit;
    cursor: pointer;
    display: block;
    height: 32px;
    margin-top: 8px;
    max-width: 300px;
    overflow: hidden;
    padding: 6px 12px;
    border: 0;
    text-align: left;
    width: 100%;
  }
  .mid {
    margin-top: 8px;
  }
`;
