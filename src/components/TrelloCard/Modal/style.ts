import styled from "styled-components";
import { Modal, Layout, Input } from "antd";

export const ModalStyle: React.CSSProperties = {
  backgroundColor: "var(--modal-background-color)",
  color: "var(--modal-color)",
};

export const TrelloCardModalStyled = styled(Modal)`
  .ant-modal-content {
    background-color: var(--modal-background-color);
    color: var(--modal-color);
  }
`;

export const ModalHeaderStyled = styled.div`
  background-color: var(--modal-background-color);
`;

export const TitleInputStyled = styled(Input)`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  line-height: 120%;
`;

export const ModalLayoutStyled = styled(Layout)``;
