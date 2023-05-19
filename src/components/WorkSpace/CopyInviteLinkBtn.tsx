import { OrganizationProps } from "@/interfaces/organization";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import React from "react";

const CopyInviteLinkBtn: React.FC<{
  userOrganization?: OrganizationProps;
  onCancel: Function;
}> = ({ userOrganization, onCancel }) => {
  const [api, contextHolder] = notification.useNotification();

  const handleClickInviteBtn = () => {
    navigator.clipboard.writeText(userOrganization?.inviteLink ?? "");
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
          backgroundColor: "white",
          color: "var(--black23)",
          width: "130px",
          height: "32px",
        }}
        onClick={handleClickInviteBtn}
        // onClick={handleClickInviteBtn}
      >
        以連結邀請
      </Button>
    </>
  );
};

export default CopyInviteLinkBtn;
