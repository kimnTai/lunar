import React from "react";
import { Sider } from "./style";
import { Button, Menu } from "antd";
import {
  VerticalRightOutlined,
  RightOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import type { MenuProps } from "antd";
import { ColorIcon, BlockIcon } from "@/components/Icons";

const Navbar: React.FC<{
  showNavbar: boolean;
  openNav: Function;
  workSpace: string;
}> = ({ showNavbar, openNav, workSpace }) => {
  const handleClosed = () => {
    openNav(true);
  };
  const handleOpen = () => {
    openNav(false);
  };

  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  // const getMenuOptions = (title: string, iconText: string,index:number) => {
  // };

  const items: MenuProps["items"] = [
    getItem(
      "我的工作區",
      "sub1",
      <ColorIcon
        color={"white"}
        text={"我"}
        size={"24px"}
        fontSize={"14px"}
        background={"var(--blue)"}
      />,
      [
        getItem("看板", "1", <BlockIcon style={{ fontSize: "20px" }} />),
        getItem(
          "成員",
          "2",
          <UsergroupAddOutlined style={{ fontSize: "20px" }} />
        ),
        getItem("設定", "3", <SettingOutlined style={{ fontSize: "20px" }} />),
      ]
    ),

    getItem(
      "公司專用工作區",
      "sub2",
      <ColorIcon
        color={"white"}
        text={"公"}
        size={"24px"}
        fontSize={"14px"}
        background={"var(--blue)"}
      />,
      [
        getItem("看板", "4", <BlockIcon style={{ fontSize: "20px" }} />),
        getItem(
          "成員",
          "5",
          <UsergroupAddOutlined style={{ fontSize: "20px" }} />
        ),
        getItem("設定", "6", <SettingOutlined style={{ fontSize: "20px" }} />),
      ]
    ),
    { type: "divider" },

    getItem(
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="ant-menu-submenu-title"
      >
        新增工作區
      </a>,
      "link",
      <PlusOutlined />
    ),
  ];
  const handleClick = (e: any) => {
    console.log(e);
  };
  return (
    <Sider
      width={257}
      collapsible
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
      workspace={workSpace}
      style={{
        backgroundColor: workSpace === "workSpace" ? "white" : "var(--dark)",
      }}
    >
      {!showNavbar ? (
        <>
          <div className="title d-space">
            <img src={Logo} alt="logo" className="logo" />
            <Button
              icon={<VerticalRightOutlined />}
              onClick={handleClosed}
              type="text"
              style={{ width: "28px", height: "28px", color: "var(--grey9F)" }}
            />
          </div>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            inlineIndent={16}
          />
        </>
      ) : (
        <Button
          icon={<RightOutlined />}
          onClick={handleOpen}
          style={{
            width: "28px",
            height: "28px",
            color: "var(--grey9F)",
            backgroundColor: "darkblue",
          }}
        />
      )}
    </Sider>
  );
};

export default Navbar;
