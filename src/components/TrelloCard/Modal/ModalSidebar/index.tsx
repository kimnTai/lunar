import React from "react";
import {
  UserOutlined,
  ContainerOutlined,
  CopyOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  WalletOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  CheckSquareOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { ModalStyle, ModalSidebarStyled } from "./style";

const ModalSidebar: React.FC = () => {
  const SidebarBox: React.FC<{
    title: string;
    className?: string;
    data: any[];
  }> = ({ title, data, className }) => {
    return (
      <div className={className}>
        <h3>{title}</h3>
        <div className="action-list">
          {data.map((ele, idx) => (
            <a href="" className="button-link" key={idx}>
              <span style={{ marginRight: "6px" }}>{ele.icon}</span>
              <span>{ele.label}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ModalSidebarStyled style={ModalStyle}>
      <SidebarBox
        title={"建議"}
        data={[{ label: "加入", value: "add", icon: <UserOutlined /> }]}
      />
      <SidebarBox
        className={"mid"}
        title={"新增至卡片"}
        data={[
          { label: "成員", value: "member", icon: <UserOutlined /> },
          { label: "標籤", value: "member", icon: <TagOutlined /> },
          { label: "代辦清單", value: "member", icon: <CheckSquareOutlined /> },
          { label: "日期", value: "member", icon: <ClockCircleOutlined /> },
          { label: "附件", value: "member", icon: <PaperClipOutlined /> },
          { label: "封面", value: "member", icon: <WalletOutlined /> },
        ]}
      />
      <SidebarBox
        className={"mid"}
        title={"動作"}
        data={[
          { label: "移動", value: "move", icon: <ArrowRightOutlined /> },
          { label: "複製", value: "copy", icon: <CopyOutlined /> },
        ]}
      />
      <Divider style={{ margin: "8px 0" }} />
      <a href="" className="button-link">
        <span style={{ marginRight: "6px" }}>
          <ContainerOutlined />
        </span>
        <span>封存</span>
      </a>
      <a href="" className="button-link">
        <span style={{ marginRight: "6px" }}>
          <ShareAltOutlined />
        </span>
        <span>分享</span>
      </a>
    </ModalSidebarStyled>
  );
};

export default ModalSidebar;
