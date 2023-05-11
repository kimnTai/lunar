import React from "react";
import { AddMemberCss } from "./style";
import { OrganizationMemberProps } from "@/interfaces/organization";
import { Avatar, Button, Divider, Form, Input, Select } from "antd";
import { LinkOutlined, MinusOutlined } from "@ant-design/icons";

interface AddMemberProps {
  member: OrganizationMemberProps[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserList: React.FC<OrganizationMemberProps> = (props) => {
  const {
    role,
    userId: { name, avatar },
  } = props;
  return (
    <div className="d-space" style={{ marginBottom: "12px" }}>
      <div className="d-flex">
        <Avatar src={avatar} style={{ width: "40px", height: "40px" }} />
        <div style={{ marginLeft: "8px" }}>
          <div style={{ color: "var(--black23)" }}>{name}</div>
          <div
            style={{ fontSize: "12px", color: "var(--gray9f)" }}
          >{`@${name}`}</div>
        </div>
      </div>
      <div className="d-flex" style={{ alignItems: "center" }}>
        <Select defaultValue={role} style={{ width: "100px" }} size="large">
          <Select.Option value="master">管理員</Select.Option>
          <Select.Option value="user">成員</Select.Option>
        </Select>
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
        />
      </div>
    </div>
  );
};
const AddMember: React.FC<AddMemberProps> = ({ member, open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AddMemberCss open={open} footer={null} onCancel={handleCancel} width={576}>
      <div className="header">邀請看板成員</div>
      <Form>
        <Form.Item name="user" className="user">
          <Input placeholder="電子郵件或用戶名稱" />
        </Form.Item>
        <Form.Item name="memberType" initialValue="user" className="select">
          <Select>
            <Select.Option value="master">管理員</Select.Option>
            <Select.Option value="user">成員</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="btn">
          <Button type="primary" htmlType="submit">
            分享
          </Button>
        </Form.Item>
      </Form>
      {member.map((ele, idx) => (
        <UserList {...ele} />
      ))}
      <Divider style={{ margin: "12px 0" }} />
      <div
        className="d-flex"
        style={{ justifyContent: "right", alignItems: "center" }}
      >
        <p>透過連結邀請新成員加入看板</p>
        <Button
          type="text"
          icon={<LinkOutlined />}
          style={{ backgroundColor: "var(--graye9)", marginLeft: "16px" }}
        >
          建立連結
        </Button>
      </div>
    </AddMemberCss>
  );
};

export default AddMember;
