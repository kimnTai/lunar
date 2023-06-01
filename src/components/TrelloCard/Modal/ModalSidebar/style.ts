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

export const AddMemberModalStyled = styled.div`
  position: absolute;
  z-index: 1000;
  width: 300px;
  .ant-close {
    position: absolute;
    right: 4px;
    top: 2px;
    border: 0;
    box-shadow: none;
  }
  .ant-space {
    width: 300px;
  }
  .ant-card-head-title {
    text-align: center;
    font-size: 12px;
  }
  .board-member-list {
    font-size: 8px;
    line-height: 22px;
    margin: 12px 0 0;
    color: var(--gray66);
  }

  .ant-list-split {
    .ant-list-item {
      border: 0;
      padding: 6px 0;
    }
    .search-list-item {
      cursor: pointer;
      padding: 8px 4px;
    }
    .search-list-item:hover {
      background-color: var(--link-background);
    }
  }
`;

export const LabelModalStyled = styled.div`
  position: absolute;
  z-index: 1000;
  width: 250px;
  .ant-close {
    position: absolute;
    right: 4px;
    top: 2px;
    border: 0;
    box-shadow: none;
  }
  .ant-card-head-title {
    text-align: center;
    font-size: 12px;
  }
  .labelBtn {
    color: "white";
    border-radius: "4px";
    width: "100%";
    height: "34px";
    padding: "0 12px";
    flex-grow: 1;
    box-shadow: none;
  }
`;
