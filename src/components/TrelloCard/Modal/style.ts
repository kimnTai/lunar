import styled from "styled-components";
import { Modal, Layout } from "antd";

export const ModalStyle: React.CSSProperties = {
  color: "var(--modal-color)",
};

export const ModalLayoutStyled = styled(Layout)``;

export const TrelloCardModalStyled = styled(Modal)`
  .ant-modal-close {
    width: 24px;
    height: 24px;
    top: 24px;
    right: 24px;
  }

  .ant-modal-content {
    color: var(--modal-color);
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .ant-modal-body {
    padding-left: 24px;
    padding-right: 24px;
  }

  .spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
