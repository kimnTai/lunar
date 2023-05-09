import { Layout, Modal } from "antd";
import styled from "styled-components";

export const HeaderCss = styled(Layout.Header)`
  padding: 16px 48px 12px;
  height: 72px;
  border-bottom: 1px solid var(--grayd4);
  .headerFunc {
    padding-right: 10px;
  }
  .serch {
    padding: 12px 16px;
    width: 500px;
    height: 44px;
    background-color: var(--graye9);
    border-radius: 8px;
    .ant-input-prefix {
      margin-left: 14px;
    }
    input {
      background-color: var(--graye9);
    }
  }
`;

export const UserModalCss = styled(Modal)`
  padding: 16px;
  .ant-modal-body {
    text-align: center;
  }
`;
