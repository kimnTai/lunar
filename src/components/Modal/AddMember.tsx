import React, { useState } from "react";
import { Button, Divider, Form, Select } from "antd";
import CopyInviteLinkBtn from "../WorkSpace/CopyInviteLinkBtn";
import InviteMemberSelect from "../WorkSpace/InviteMemberSelect";
import UserList from "./UserList";
import { AddMemberCss } from "./style";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addBoardMembersAction, selectBoard } from "@/redux/boardSlice";

const AddMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const board = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });

  const onFinish = async () => {
    setLoading(true);

    try {
      await dispatch(
        addBoardMembersAction({
          boardId: board._id,
          userIdList: selectedUsers.userIdList,
        })
      );
    } catch (error) {}

    setSelectedUsers({
      userIdList: [],
    });
    setOpen(false);
    setLoading(false);
    form.resetFields();
  };

  return (
    <AddMemberCss
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      width={576}
    >
      <div className="header">邀請看板成員</div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="invite" className="user">
          <InviteMemberSelect
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </Form.Item>
        <Form.Item initialValue="user" className="select">
          <Select
            options={[
              { value: "manager", label: "管理員" },
              { value: "editor", label: "成員" },
              { value: "viewer", label: "一般" },
            ]}
          />
        </Form.Item>
        <Form.Item className="btn">
          <Button type="primary" htmlType="submit" loading={loading}>
            邀請
          </Button>
        </Form.Item>
      </Form>
      {board.member?.map((ele) => (
        <UserList {...ele} key={ele.userId._id} />
      ))}
      <Divider style={{ margin: "12px 0" }} />
      <div
        className="d-flex"
        style={{ justifyContent: "right", alignItems: "center" }}
      >
        <p>透過連結邀請新成員加入看板</p>
        <CopyInviteLinkBtn
          setOpen={setOpen}
          style={{ backgroundColor: "var(--graye9)", marginLeft: "16px" }}
          type="BOARD"
        />
      </div>
    </AddMemberCss>
  );
};

export default AddMember;
