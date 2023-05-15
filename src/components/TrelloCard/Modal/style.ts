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
    overflow: hidden;
  }

  .ant-modal-body {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const ModalHeaderStyled = styled.div`
  padding: 0;
  margin: 0 0 16px;

  .coverImg {
    width: 100%;
    height: 160px;
    border-radius: 0;
    overflow: hidden;
  }
`;

export const CardHeaderToolbarStyled = styled.div`
  border-bottom: 1px solid #d4d4d4;
  padding: 20px 20px 12px;
  margin-bottom: 8px;

  .col {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    color: #0083ff;
    font-size: 16px;
  }

  p {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    cursor: pointer;
  }
`;

export const CardTitleStyled = styled.div`
  padding: 0 20px 0;

  .titleInput {
    width: 100%;
  }

  .titleTxt,
  .titleInput {
    font-size: 24px;
    font-weight: 600;
    line-height: 120%;
  }
`;
