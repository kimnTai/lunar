import React, { useState } from "react";
import { Button, Popover } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { OrganizationMemberProps } from "@/interfaces/organization";
import { deleteBoardMembersAction, selectBoard } from "@/redux/boardSlice";

const RemoveBoardMember: React.FC<OrganizationMemberProps> = (member) => {
  const board = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  const [spinning, setSpinning] = useState(false);

  const onClick = async () => {
    setSpinning(true);

    await dispatch(
      deleteBoardMembersAction({
        boardId: board._id,
        memberId: member.userId._id,
      })
    );

    setSpinning(false);
  };

  return (
    <Popover
      placement="bottom"
      trigger="click"
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          從看板上移除
        </div>
      }
      content={
        <div>
          <p
            style={{
              paddingBottom: 10,
            }}
          >{`${member.userId.name} 將從此看板成員中移除。`}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              danger
              type="primary"
              style={{
                width: "100%",
              }}
              loading={spinning}
              onClick={onClick}
            >
              移除
            </Button>
          </div>
        </div>
      }
    >
      <Button
        shape="circle"
        danger
        style={{
          width: "24px",
          height: "24px",
          padding: 0,
          minWidth: "auto",
          marginLeft: "8px",
        }}
        icon={<MinusOutlined />}
        loading={spinning}
      />
    </Popover>
  );
};

export default RemoveBoardMember;
