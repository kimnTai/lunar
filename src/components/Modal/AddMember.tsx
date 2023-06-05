import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, Divider, Form, Select } from "antd";
import { addBoardMembersApi } from "@/api/boards";
import { OrganizationMemberProps } from "@/interfaces/organization";
import CopyInviteLinkBtn from "../WorkSpace/CopyInviteLinkBtn";
import InviteMemberSelect from "../WorkSpace/InviteMemberSelect";
import UserList from "./UserList";
import { AddMemberCss } from "./style";

const AddMember: React.FC<{
  member: OrganizationMemberProps[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardInviteLink: string;
}> = ({ member, open, setOpen, boardInviteLink }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });

  const { boardId } = useParams();

  const onFinish = async () => {
    setLoading(true);

    try {
      await addBoardMembersApi({
        boardId: boardId!,
        userIdList: selectedUsers.userIdList,
      });
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
      {member && member?.map((ele, idx) => <UserList {...ele} key={idx} />)}
      <Divider style={{ margin: "12px 0" }} />
      <div
        className="d-flex"
        style={{ justifyContent: "right", alignItems: "center" }}
      >
        <p>透過連結邀請新成員加入看板</p>
        <CopyInviteLinkBtn
          setOpen={setOpen}
          style={{ backgroundColor: "var(--graye9)", marginLeft: "16px" }}
          boardInviteLink={boardInviteLink}
        />
      </div>
    </AddMemberCss>
  );
};

export default AddMember;
