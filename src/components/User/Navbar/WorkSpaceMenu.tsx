import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, type MenuProps } from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons/lib/icons";
import BlockIcon from "@/components/Icons/BlockIcon";
import ColorIcon from "@/components/Icons/ColorIcon";
import { useAppSelector } from "@/hooks";
import { selectOrganization } from "@/redux/organizationSlice";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const WorkSpaceMenu: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [select, setSelect] = useState(() => location.pathname);

  const organizationId = useParamOrganization()?._id;
  const [openKey, setOpenKey] = useState(() => [`${organizationId}`]);

  const [items, setItems] = useState<MenuProps["items"]>();
  const organization = useAppSelector(selectOrganization);
  useLayoutEffect(() => {
    const useItem = organization?.map(({ name, _id }) => {
      return {
        label: name,
        key: _id,
        icon: (
          <ColorIcon
            text={`${name.at(0)}`}
            color={"white"}
            size={"24px"}
            fontSize={"14px"}
            background={"var(--blue)"}
          />
        ),
        children: [
          {
            label: "看板",
            key: `/workspace/${_id}/home`,
            icon: (
              <BlockIcon style={{ fontSize: "20px", marginLeft: "-17px" }} />
            ),
          },
          {
            label: "成員",
            key: `/workspace/${_id}/members`,
            icon: (
              <UsergroupAddOutlined
                style={{ fontSize: "20px", marginLeft: "-17px" }}
              />
            ),
          },
          {
            label: "設定",
            key: `/workspace/${_id}/setting`,
            icon: (
              <SettingOutlined
                style={{ fontSize: "20px", marginLeft: "-17px" }}
              />
            ),
          },
        ],
      };
    });

    const defaultItems = [
      {
        label: (
          <a target="_blank" rel="noopener noreferrer">
            {"新增工作區"}
          </a>
        ),
        key: "addModal",
        icon: <PlusOutlined />,
      },
    ];

    setTimeout(() => {
      setItems([...useItem, ...defaultItems]);
    });
  }, [organization?.length]);

  return (
    <Menu
      onClick={({ key }) => {
        if (key === "addModal") {
          setOpen(true);
        }
        if (key.includes("/workspace")) {
          navigate(`${key}`);
        }
      }}
      selectedKeys={[select]}
      openKeys={openKey}
      mode="inline"
      items={items}
      inlineIndent={16}
      onSelect={({ key }) => setSelect(key)}
      onOpenChange={(openKeys) => setOpenKey(openKeys)}
      style={{
        backgroundColor: "white",
        color: "black",
      }}
    />
  );
};

export default WorkSpaceMenu;
