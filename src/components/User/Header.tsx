import React, { useState } from "react";
import { HeaderCss } from "./style";
import {
  SearchOutlined,
  DownOutlined,
  BellOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Button, Dropdown, Space, Tooltip, Badge, Avatar } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DropdownBtn } from "@/components/DropdownBtn";

const items: MenuProps["items"] = [
  {
    label: "Submit and continue",
    key: "1",
  },
];

export const Header: React.FC<{
  workSpace: boolean;
}> = (props) => {
  const { workSpace } = props;
  const { avatar, name } = JSON.parse(localStorage.getItem("userData")!);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <HeaderCss
      className="d-space"
      style={{ backgroundColor: workSpace ? "white" : "var(--black23)" }}
    >
      <div className="d-center">
        <div style={{ display: workSpace ? "none" : "block" }}>
          <DropdownBtn items={items} title={"工作區"} />
          <DropdownBtn items={items} title={"最近的"} />
        </div>

        <Input
          className="search"
          placeholder="搜尋所有卡片"
          prefix={<SearchOutlined />}
          style={{}}
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
          icon={<PoweroffOutlined />}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: 50,
            border: 0,
            background: "#F7F7F7",
            marginLeft: "16px",
          }}
          shape="circle"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            navigate("/");
          }}
        />
        <Avatar src={avatar} style={{ marginLeft: "16px" }} />
        <p style={{ marginLeft: "8px", color: workSpace ? "black" : "white" }}>
          {name}
        </p>
      </div>
    </HeaderCss>
  );
};
