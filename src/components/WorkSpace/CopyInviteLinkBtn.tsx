import React, { CSSProperties, useState } from "react";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { generateBoardInviteLinkAction, selectBoard } from "@/redux/boardSlice";
import { generateInviteLinkAction } from "@/redux/organizationSlice";
import openNotification from "@/utils/openNotification";

const CopyInviteLinkBtn: React.FC<{
  type: "ORGANIZATION" | "BOARD";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: CSSProperties;
}> = ({ type, setOpen, style }) => {
  const dispatch = useAppDispatch();
  const organization = useParamOrganization();
  const board = useAppSelector(selectBoard);

  const [loading, setLoading] = useState(false);

  const handleClickInviteBtn = async () => {
    setLoading(true);

    let link = "";

    if (type === "ORGANIZATION" && organization) {
      if (organization.inviteLink) {
        link = organization.inviteLink;
      } else {
        const action = await dispatch(
          generateInviteLinkAction(organization._id)
        );

        link = (action.payload as any).result.inviteLink;
      }
    }

    if (type === "BOARD" && board) {
      if (board.inviteLink) {
        link = board.inviteLink;
      } else {
        const action = await dispatch(generateBoardInviteLinkAction(board._id));

        link = (action.payload as any).result.inviteLink;
      }
    }

    navigator.clipboard.writeText(link);

    openNotification({
      message: "已複製到剪貼簿",
    });

    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <Button
        loading={loading}
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
