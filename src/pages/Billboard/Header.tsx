import React, { useState } from "react";
import { HeaderCss } from "./style";
import {
  SearchOutlined,
  DownOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Button, Dropdown, Space, Tooltip, Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.png";

const items: MenuProps["items"] = [
  {
    label: "Submit and continue",
    key: "1",
  },
];

export const Header: React.FC<{ workSpace: string }> = (props) => {
  const { workSpace } = props;
  const [serch, setSerch] = useState("");
  return (
    <HeaderCss className="d-space" workspace={workSpace}>
      <div className="d-center">
        {workSpace !== "workSpace" && (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button>
                <Space>
                  工作區
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button>
                <Space>
                  最近的
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </>
        )}
        {/* <Search placeholder="搜尋" onSearch={setSerch} style={{width:'500px',}} /> */}
        <Input
          className="serch"
          placeholder="搜尋所有卡片"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="d-center">
        <Badge size="default" count={5}>
          <Button
            icon={<BellOutlined />}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: 50,
              border: 0,
              background: "#F7F7F7",
            }}
            shape="circle"
          />
        </Badge>
        <Button
          shape="circle"
          icon={<QuestionCircleOutlined />}
          style={{ marginLeft: "16px" }}
        />
      </div>
    </HeaderCss>
  );
};
