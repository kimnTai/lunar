import { HeaderState } from "@/interfaces/boards";
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
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";

const BillboardHeader: React.FC = () => {
  const board = useAppSelector(selectBoard);
  const [openInvite, setOpenInvite] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderState>("MENU");

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
          background-image={board?.image && `url(${board.image})`}
        />
        <p style={{ marginLeft: "16px" }}>{board?.name}</p>
      </div>
      <div className="right-head">
        <Avatar.Group>
          {board?.member?.map(({ userId: { avatar, name, _id } }) => (
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
              headerState={headerState}
              setHeaderState={setHeaderState}
              setOpenPopover={setOpenPopover}
            />
          }
          content={
            <PopoverContent
              headerState={headerState}
              setHeaderState={setHeaderState}
            />
          }
          trigger="click"
          open={openPopover}
          onOpenChange={(visible) => {
            if (!visible) {
              setHeaderState("MENU");
            }
            setOpenPopover(visible);
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
      <AddMember open={openInvite} setOpen={setOpenInvite} />
    </BillboardHeaderCss>
  );
};

export default BillboardHeader;
