import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import ColorIcon from "@/components/Icons/ColorIcon";
import { getMenuItem as getItem } from "@/utils/func";
import BlockIcon from "@/components/Icons/BlockIcon";
import {
  PlusOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons/lib/icons";

interface NavBarMenuProps {
  workSpace: boolean;
  data: { name: string; _id: string }[];
  setOpen: Function;
  id?: string;
}

const NavBarMenu: React.FC<NavBarMenuProps> = ({
  workSpace,
  data,
  setOpen,
  id,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuProps["items"]>();
  const [select, setSelect] = useState<string>("");
  const [openKey, setOpenKey] = useState<string[]>();

  const handleClick: MenuProps["onClick"] = (element) => {
    console.log(element);
    if (element.key === "addModal") {
      setOpen(true);
    }
    if (element.key.indexOf("/") !== -1) {
      navigate(`/workspace/${element.key}`);
    }
    if (!workSpace && element.key !== "addModal") {
      navigate(`/board/${element.key}`);
    }
  };
  const handleSelectChange = (element: any) => {
    setSelect(element.key);
  };
  const handleOpenChange = (element: any) => {
    setOpenKey(element);
  };

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

  const defaultItems: MenuProps["items"] = [
    { type: "divider" },
    getItem(
      <a
        target="_blank"
        rel="noopener noreferrer"
        // className="ant-menu-submenu-title"
        // style={{background: workSpace ? "var(--graye9)" : "#e9e9e9"}}
      >
        {workSpace ? "新增工作區" : "新增看板"}
      </a>,
      "addModal",
      <PlusOutlined />
    ),
  ];

  useEffect(() => {
    if (data) {
      const useItem = data.map((ele) => {
        return workSpace
          ? getItem(
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
            )
          : getItem(
              ele.name,
              ele._id,
              <ColorIcon
                color={"white"}
                text={`${ele.name[0]}`}
                size={"24px"}
                fontSize={"14px"}
                background={"var(--blue)"}
              />
            );
      });

      setSelect(workSpace ? `${data[0]._id}/home` : `${id}`);
      setOpenKey([data[0]._id]);
      setItems([...useItem, ...defaultItems]);
    }
  }, [data?.length]);

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[select]}
        openKeys={openKey}
        mode="inline"
        items={items}
        inlineIndent={16}
        onSelect={handleSelectChange}
        onOpenChange={handleOpenChange}
        style={{
          backgroundColor: workSpace ? "white" : "var(--black23)",
          color: workSpace ? "black" : "white",
        }}
      />
    </>
  );
};

export default NavBarMenu;
