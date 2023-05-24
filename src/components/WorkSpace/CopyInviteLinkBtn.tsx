import { OrganizationProps } from "@/interfaces/organization";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import React from "react";

const CopyInviteLinkBtn: React.FC<{
  userOrganization?: OrganizationProps;
  boardInviteLink?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: any;
}> = ({ userOrganization, setOpen, style, boardInviteLink }) => {
  const [api, contextHolder] = notification.useNotification();

  const onCancel: () => void = () => {
    setOpen(false);
  };

  const handleClickInviteBtn = () => {
    if (userOrganization) {
      navigator.clipboard.writeText(userOrganization?.inviteLink ?? "");
    } else if (boardInviteLink) {
      navigator.clipboard.writeText(boardInviteLink);
    }

    api["success"]({
      message: "已複製到剪貼簿",
      placement: "bottomLeft",
    });
    onCancel();
  };

  return (
    <>
      {contextHolder}
      <Button
        icon={<UserAddOutlined />}
        style={{
          ...style,
        }}
        onClick={handleClickInviteBtn}
      >
        以連結邀請
      </Button>
    </>
  );
};

export default CopyInviteLinkBtn;
