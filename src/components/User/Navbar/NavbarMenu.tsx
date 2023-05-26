import React, { useEffect, useLayoutEffect, useState } from "react";
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
  data: {
    name: string;
    _id: string;
    image?: string;
  }[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  workSpaceId?: string;
}

const NavBarMenu: React.FC<NavBarMenuProps> = ({
  workSpace,
  data,
  setOpen,
  id,
  workSpaceId,
}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuProps["items"]>();
  const [select, setSelect] = useState<string>("");
  const [openKey, setOpenKey] = useState<string[]>();

  const handleClick: MenuProps["onClick"] = (element) => {
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
      `${id}/setting`,
      <SettingOutlined style={{ fontSize: "20px" }} />
    ),
  ];

  const defaultItems = [
    { label: "", key: "", type: "divider" },
    getItem(
      <a target="_blank" rel="noopener noreferrer">
        {workSpace ? "新增工作區" : "新增看板"}
      </a>,
      "addModal",
      <PlusOutlined />
    ),
  ];

  useLayoutEffect(() => {
    if (data) {
      const useItem = data.map((ele) =>
        getItem(
          ele.name,
          ele._id,
          <ColorIcon
            color={"white"}
            text={workSpace ? `${ele.name.at(0)}` : ""}
            size={"24px"}
            fontSize={"14px"}
            background={
              workSpace
                ? "var(--blue)"
                : `linear-gradient(
                  112.89deg,
                  #0083ff 1.48%,
                  rgba(128, 0, 255, 0.86) 100%
                )`
            }
            background-image={ele.image && `url(${ele.image})`}
          />,
          workSpace ? getSubMenu(ele._id) : undefined
        )
      );

      setTimeout(() => {
        setItems([...useItem, ...defaultItems]);
      });
    }
  }, [data?.length]);

  useEffect(() => {
    setSelect(workSpace ? `${workSpaceId}/home` : `${id}`);
    if (workSpace) {
      const key = `${data.find((ele) => ele?._id === workSpaceId)?._id}`;
      setOpenKey([key]);
    }
  }, [workSpace, workSpaceId, id]);
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
