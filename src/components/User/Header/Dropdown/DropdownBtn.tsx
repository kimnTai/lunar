import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { DropdownProps, MenuProps, Space } from "antd";
import { DropdownBtnCss } from "./style";

const DropdownBtn: React.FC<
  DropdownProps & {
    items: MenuProps["items"];
    title: string;
  }
> = (props) => {
  return (
    <DropdownBtnCss
      {...props}
      menu={{ items: props.items }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {props.title}
          <DownOutlined />
        </Space>
      </a>
    </DropdownBtnCss>
  );
};

export default DropdownBtn;
