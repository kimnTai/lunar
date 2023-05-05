import styled from "styled-components";
import { Modal } from "antd";

export const AddWorkSpaceCss = styled(Modal)`
  h2 {
    font-size: 24px;
    font-weight: "bold";
  }
  .head {
    margin-bottom: 10px;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
  .invite {
    label {
      display: block;
    }
  }
`;

export const AddBoardsCss = styled(Modal)`
  .ant-modal-content {
    padding: 0px;
  }
  .ant-modal-header {
    padding: 16px;
    border-bottom: 1px solid var(--grayd4);
    margin-bottom: 0;
  }
  .ant-modal-body {
    padding: 8px 16px 16px;
    margin: 0;
  }
  .head-img {
    width: 319px;
    height: 150px;
  }
  .ant-select-selector {
    height: 48px !important;
    overflow: auto;
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

