import { BillboardHeaderProps } from "@/interfaces/boards";
import { useState } from "react";
import { BillboardHeaderBtn, BillboardHeaderCss } from "./style";
import { ColorIcon } from "@/components/Icons";
import { Avatar, Button, Popover, Tooltip } from "antd";
import {
  DashOutlined,
  FilterOutlined,
  TeamOutlined,
} from "@ant-design/icons/lib/icons";
import PopoverTitle from "./PopoverTitle";
import PopoverContent from "./PopoverContent";
import AddMember from "@/components/Modal/AddMember";

const BillboardHeader: React.FC<BillboardHeaderProps> = ({
  name,
  member,
  boardInviteLink,
  orgId,
  callApi,
  boardId,
  image,
}) => {
  const [openInvite, setOpenInvite] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isLabel, setIsLabel] = useState(false);

  return (
    <BillboardHeaderCss className="d-space">
      <div className="left-head">
        <ColorIcon
          color={"#A0D7FF"}
          text={""}
          size={"24px"}
          fontSize={"14px"}
          background={`linear-gradient(
                  112.89deg,
                  #0083ff 1.48%,
                  rgba(128, 0, 255, 0.86) 100%
                )`}
          background-image={image && `url(${image})`}
        />
        <p style={{ marginLeft: "16px" }}>{name}</p>
      </div>
      <div className="right-head">
        <Avatar.Group>
          {member?.map(({ userId: { avatar, name, _id } }) => (
            <Tooltip placement="top" title={name} key={_id}>
              <Avatar src={avatar} />
            </Tooltip>
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
          title={
            <PopoverTitle
              isMenu={isMenu}
              isUser={isUser}
              isSetting={isSetting}
              isLabel={isLabel}
              setIsMenu={setIsMenu}
              setOpenPopover={setOpenPopover}
              setIsUser={setIsUser}
              setIsSetting={setIsSetting}
              setIsLabel={setIsLabel}
            />
          }
          content={
            <PopoverContent
              name={name}
              member={member}
              orgId={orgId}
              isUser={isUser}
              isMenu={isMenu}
              isSetting={isSetting}
              isLabel={isLabel}
              setIsUser={setIsUser}
              setIsMenu={setIsMenu}
              setIsSetting={setIsSetting}
              setIsLabel={setIsLabel}
              callApi={callApi}
              boardId={boardId || ""}
            />
          }
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
      <AddMember
        open={openInvite}
        setOpen={setOpenInvite}
        member={member}
        boardInviteLink={boardInviteLink}
      />
    </BillboardHeaderCss>
  );
};

export default BillboardHeader;
