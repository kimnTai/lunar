import { Layout, Modal } from "antd";
import styled from "styled-components";

export const HeaderCss = styled(Layout.Header)`
  padding: 16px 48px 12px;
  height: 72px;
  border-bottom: 1px solid var(--grayd4);
  .headerFunc {
    padding-right: 10px;
  }
`;

export const UserModalCss = styled(Modal)`
  padding: 16px;
  .ant-modal-body {
    text-align: center;
  }

  .avatarSection {
    display: inline-block;
    margin-bottom: 16px;
    position: relative;
  }

  .ant-upload {
    height: 64px;
    display: inline-block;
    position: relative;
  }

  .avatar-uploader {
    position: relative;
  }

  .avatarBlock {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }

  .avatarUploadBtn {
    width: 24px;
    height: 24px;
    min-width: 24px;
    line-height: 1;
    position: absolute;
    right: -4px;
    bottom: 0px;
  }

  .uploadIcon {
    font-size: 10px;
  }

  .loading {
    font-size: 24px;
    position: absolute;
    top: 35%;
    left: 35%;
    z-index: 1;
  }

  .updateProfileBtn {
    margin-top: 16px;
    margin-bottom: 12px;
  }

`;

export const SearchCardInputStyled = styled.div`
  width: 500px;
  .ant-select-selector {
    height: 100% !important;
    border: 0 !important;
  }
  .ant-select-selection-placeholder {
    line-height: 44px !important;
    display: flex;
  }
  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }
  .search {
    width: 100%;
    .ant-select-selector {
      background-color: var(--graye9);
    }
    .ant-select-selection-placeholder {
      background-color: var(--graye9);
      padding-left: 14px;
    }
    .ant-select-selection-search-input {
      font-size: 16px !important;
    }
  }
  .darkSearch {
    width: 100%;
    .ant-select-selector {
      background-color: var(--black);
    }
    .ant-select-selection-placeholder {
      color: var(--gray9f);
      padding-left: 14px;
      font-size: 16px;
    }
    .ant-select-selection-search-input {
      color: white !important;
      font-size: 16px !important;
    }
  }
`;
