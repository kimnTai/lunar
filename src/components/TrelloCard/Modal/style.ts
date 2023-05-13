import styled from "styled-components";
import { Modal, Layout, Input } from "antd";

const { Sider, Content } = Layout;

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
export const ModalContentStyled = styled(Content)`
  .contentHeader {
    display: flex;
    align-items: center;
  }
`;
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
    :hover {
      background-color: var(--modal-button-neutral-hover);
    }
  }
  .mid {
    margin-top: 8px;
  }
`;
