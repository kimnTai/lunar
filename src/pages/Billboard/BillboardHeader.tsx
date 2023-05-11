import React, { useState } from "react";
import { BillboardHeaderProps } from "@/interfaces/boards";
import { BillboardHeaderCss, BillboardHeaderBtn } from "./style";
import { ColorIcon } from "@/components/Icons";
import { FilterOutlined, TeamOutlined, DashOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import AddMember from "@/components/Modal/AddMember";

const BillboardHeader: React.FC<BillboardHeaderProps> = ({ name, member }) => {
  const [openInvite, setOpenInvite] = useState(false);
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
        <Button
          type="link"
          style={{ width: "32px", height: "32px", padding: 0 }}
        >
          <DashOutlined style={{ color: "white", fontSize: "16px" }} />
        </Button>
      </div>
      <AddMember open={openInvite} setOpen={setOpenInvite} member={member} />
    </BillboardHeaderCss>
  );
};

export default BillboardHeader;
