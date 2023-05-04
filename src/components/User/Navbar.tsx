import React, { useEffect, useState } from "react";
import { Sider } from "./style";
import { Button, Menu } from "antd";
import {
  VerticalRightOutlined,
  RightOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import Logo2 from "@/assets/images/img_logo2.png";
import type { MenuProps } from "antd";
import { ColorIcon, BlockIcon } from "@/components/Icons";
import AddWorkSpace from "@/components/Modal/AddWorkSpace";
import { getMenuItem as getItem } from "@/utils/func";
import { useSelector } from "react-redux";
import { OrganizationProps } from "@/interfaces/organization";

export const Navbar: React.FC<{
  showNavbar: boolean;
  openNav: Function;
  workSpace: boolean;
  setWrokSpace: Function;
  getOrganization: Function;
}> = ({ showNavbar, openNav, workSpace, setWrokSpace, getOrganization }) => {
  const navigate = useNavigate();
  const handleClosed = () => {
    openNav(true);
  };
  const handleOpen = () => {
    openNav(false);
  };

  const defaultItems = [
    { type: "divider" },
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="ant-menu-submenu-title"
      >
        新增工作區
      </a>,
      "addWorkSpace",
      <PlusOutlined />
    ),
  ];
  const getSubMenu = (id: string) => [
    getItem("看板", `${id}/home`, <BlockIcon style={{ fontSize: "20px" }} />),
    getItem(
      "成員",
      `${id}/members`,
      <UsergroupAddOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
      "設定",
      `${id}/account`,
      <SettingOutlined style={{ fontSize: "20px" }} />
    ),
  ];

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MenuProps["items"]>();
  const userOrganization = useSelector((state: any) => state.user.organization);
  console.log("===userOrganization===", userOrganization);

  const handleClick = (element: any) => {
    console.log(element);
    if (element.key === "addWorkSpace") setOpen(true);
    if (element.key.indexOf("/home") !== -1)
      navigate(`/workspace/${element.key}`);
  };

  useEffect(() => {
    const useItem = userOrganization.map((ele: OrganizationProps) => {
      return getItem(
        ele.name,
        ele._id,
        <ColorIcon
          color={"white"}
          text={`${ele.name[0]}`}
          size={"24px"}
          fontSize={"14px"}
          background={"var(--blue)"}
        />,
        getSubMenu(ele._id)
      );
    });
    setItems([...useItem, ...defaultItems]);
  }, [userOrganization]);
  return (
    <Sider
      width={257}
      collapsible
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
      style={{
        backgroundColor: workSpace ? "white" : "var(--black23)",
      }}
    >
      {!showNavbar ? (
        <>
          <div className="title d-space">
            {workSpace ? (
              <img src={Logo} className="logo" />
            ) : (
              <div className="logo-div">
                <Button
                  icon={<ArrowLeftOutlined style={{ fontSize: "16px" }} />}
                  type="link"
                  style={{
                    width: "16px",
                    height: "16px",

                    color: "white",
                  }}
                  className="d-center"
                  onClick={() => {
                    setWrokSpace(true);
                    navigate("/");
                  }}
                />
                <img src={Logo2} className="logo2" />
              </div>
            )}
            <Button
              icon={<VerticalRightOutlined />}
              onClick={handleClosed}
              type="link"
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
            style={{
              backgroundColor: workSpace ? "white" : "var(--black23)",
              color: workSpace ? "black" : "white",
            }}
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
      <AddWorkSpace open={open} setOpen={setOpen} />
    </Sider>
  );
};
