import { Layout, Modal } from "antd";
import styled from "styled-components";

export const HeaderCss = styled(Layout.Header)`
  padding: 16px 48px 12px;
  height: 72px;
  border-bottom: 1px solid var(--grayd4);
  .headerFunc {
    padding-right: 10px;
  }
  .search {
    padding: 12px 16px;
    width: 500px;
    height: 44px;
    background-color: var(--graye9);
    border-radius: 8px;
    .ant-input-prefix {
      // margin-left: 14px;
    }
    input {
      background-color: var(--graye9);
      padding-left: 14px;
    }
  }
  .darkSearch {
    padding: 12px 16px;
    width: 500px;
    height: 44px;
    background-color: var(--black);
    border-radius: 8px;
    border: 0;
    .ant-input-prefix {
      // margin-left: 14px;
    }
    input {
      background-color: var(--black);
      ::placeholder {
        color: #9f9f9f;
        padding-left: 14px;
        font-size: 16px;
      }
    }
  }
`;

export const UserModalCss = styled(Modal)`
  padding: 16px;
  .ant-modal-body {
    text-align: center;
  }
`;
