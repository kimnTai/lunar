import { useState } from "react";
import { Avatar, Button, Popover, Tooltip } from "antd";
import {
  DashOutlined,
  FilterOutlined,
  TeamOutlined,
} from "@ant-design/icons/lib/icons";
import AvatarCustom from "@/components/AvatarCustom";
import AddMember from "@/components/Modal/AddMember";
import { useAppSelector } from "@/hooks";
import { HeaderState } from "@/interfaces/boards";
import { selectBoard } from "@/redux/boardSlice";
import BoardTitle from "./BoardTitle";
import PopoverContent from "./PopoverContent";
import PopoverTitle from "./PopoverTitle";
import { BillboardHeaderBtn, BillboardHeaderCss } from "./style";

const BillboardHeader: React.FC = () => {
  const board = useAppSelector(selectBoard);
  const [openInvite, setOpenInvite] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderState>("MENU");

  return (
    <BillboardHeaderCss className="d-space">
      <BoardTitle />
      <div className="right-head">
        <Avatar.Group>
          {board?.member?.map(({ userId: { avatar, name, _id } }) => (
            <Tooltip placement="top" title={name} key={_id}>
              <AvatarCustom username={name} imgUrl={avatar} />
            </Tooltip>
          ))}
        </Avatar.Group>
        <BillboardHeaderBtn
          icon={<FilterOutlined style={{ fontSize: "16px" }} />}
          // TODO:篩選功能
          style={{ display: "none" }}
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
