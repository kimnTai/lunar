import { Dropdown, Space } from "antd";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import styled from "styled-components";

const DropdownBtnCss = styled(Dropdown)`
  color: white;
  margin-right: 24px;
  font-size: 16px;
  &:hover {
    color: white;
  }
  width: 73px;
`;

export const DropdownBtn: React.FC<{
  items: MenuProps["items"];
  title: string;
}> = ({ items, title }) => {
  return (
    <DropdownBtnCss menu={{ items }} trigger={["click"]}>
      <a
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Space>
          {title}
          <DownOutlined />
        </Space>
      </a>
    </DropdownBtnCss>
  );
};
