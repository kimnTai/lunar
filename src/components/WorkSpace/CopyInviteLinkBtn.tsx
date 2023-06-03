import React, { CSSProperties } from "react";
import { Button, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const CopyInviteLinkBtn: React.FC<{
  organizationInviteLink?: string;
  boardInviteLink?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: CSSProperties;
}> = ({ setOpen, style, organizationInviteLink, boardInviteLink }) => {
  const [api, contextHolder] = notification.useNotification();

  const handleClickInviteBtn = () => {
    if (organizationInviteLink) {
      navigator.clipboard.writeText(organizationInviteLink);
    } else if (boardInviteLink) {
      navigator.clipboard.writeText(boardInviteLink);
    }

    api.success({
      message: "已複製到剪貼簿",
      placement: "bottomLeft",
    });

    setOpen(false);
  };

  return (
    <>
      {contextHolder}
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
