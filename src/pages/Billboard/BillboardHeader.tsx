import React, { useState } from "react";
import { BillboardHeaderProps } from "@/interfaces/boards";
import {
  BillboardHeaderCss,
  BillboardHeaderBtn,
  PopoverTitleStyle,
  PopoverContentStyle,
} from "./style";
import { ColorIcon } from "@/components/Icons";
import {
  FilterOutlined,
  TeamOutlined,
  DashOutlined,
  CloseOutlined,
  UserOutlined,
  SettingOutlined,
  TagOutlined,
  InboxOutlined,
  CopyOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import AddMember from "@/components/Modal/AddMember";
import { ListButton } from "@/components/ListButton";

const BillboardHeader: React.FC<BillboardHeaderProps> = ({ name, member }) => {
  const [openInvite, setOpenInvite] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const PopoverTitle: React.FC = () => (
    <PopoverTitleStyle>
      選單
      <Button
        size="small"
        type="text"
        icon={
          <CloseOutlined
            style={{
              color: "var(--gray66)",
            }}
          />
        }
        style={{ position: "absolute", right: 3 }}
        onClick={() => setOpenPopover(false)}
      />
    </PopoverTitleStyle>
  );
  const PopoverContent: React.FC = () => (
    <PopoverContentStyle>
      <div className="top-border listBtn">
        <ListButton
          icon={
            <UserOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="查看看板管理員"
        />
        <ListButton
          icon={
            <SettingOutlined
              style={{ fontSize: "20px", marginRight: "12px" }}
            />
          }
          text="設定"
        />
        <ListButton
          icon={
            <TagOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="標籤"
        />
        <ListButton
          icon={
            <InboxOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="已封存的項目"
        />
      </div>
      <div className="top-border listBtn">
        <ListButton
          icon={
            <CopyOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="複製看板"
        />
        <ListButton
          icon={
            <UploadOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="分享"
        />
      </div>
      <div className="top-border" style={{ paddingBottom: 0 }}>
        <ListButton
          icon={
            <LogoutOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="退出看板"
          danger={true}
        />
      </div>
    </PopoverContentStyle>
  );

  return (
    <BillboardHeaderCss className="d-space">
      <div className="left-head">
        <ColorIcon
          color={"white"}
          text={name && name[0]}
          size={"24px"}
          fontSize={"14px"}
          background={""}
        />
        <p style={{ marginLeft: "16px" }}>{name}</p>
      </div>
      <div className="right-head">
        <Avatar.Group>
          {member &&
            member?.map((ele, idx) => (
              <Avatar src={ele.userId.avatar} key={idx} />
            ))}
        </Avatar.Group>
        <BillboardHeaderBtn
          icon={<FilterOutlined style={{ fontSize: "16px" }} />}
        >
          篩選
        </BillboardHeaderBtn>
        <BillboardHeaderBtn
          icon={<TeamOutlined style={{ fontSize: "16px" }} />}
          onClick={() => setOpenInvite(true)}
        >
          邀請成員
        </BillboardHeaderBtn>
        <Popover
          placement="bottomRight"
          arrow={false}
          title={<PopoverTitle />}
          content={<PopoverContent />}
          trigger="click"
          open={openPopover}
          onOpenChange={(e) => {
            setOpenPopover(e);
          }}
        >
          <Button
            type="link"
            style={{ width: "32px", height: "32px", padding: 0 }}
          >
            <DashOutlined style={{ color: "white", fontSize: "16px" }} />
          </Button>
        </Popover>
      </div>
      <AddMember open={openInvite} setOpen={setOpenInvite} member={member} />
    </BillboardHeaderCss>
  );
};

export default BillboardHeader;
