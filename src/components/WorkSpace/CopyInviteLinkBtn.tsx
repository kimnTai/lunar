import React, { CSSProperties } from "react";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import openNotification from "@/utils/openNotification";

const CopyInviteLinkBtn: React.FC<{
  organizationInviteLink?: string;
  boardInviteLink?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: CSSProperties;
}> = ({ setOpen, style, organizationInviteLink, boardInviteLink }) => {
  const handleClickInviteBtn = () => {
    if (organizationInviteLink) {
      navigator.clipboard.writeText(organizationInviteLink);
    } else if (boardInviteLink) {
      navigator.clipboard.writeText(boardInviteLink);
    }

    openNotification({
      message: "已複製到剪貼簿",
    });

    setOpen(false);
  };

  return (
    <>
      <Button
        icon={<UserAddOutlined />}
        style={style}
        onClick={handleClickInviteBtn}
      >
        以連結邀請
      </Button>
    </>
  );
};

export default CopyInviteLinkBtn;
