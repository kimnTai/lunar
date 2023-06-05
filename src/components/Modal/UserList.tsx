import React from "react";
import { Avatar, Button, Select } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { OrganizationMemberProps } from "@/interfaces/organization";

const UserList: React.FC<OrganizationMemberProps> = ({
  role,
  userId: { name, avatar },
}) => {
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
        <Select
          defaultValue={role}
          style={{ width: "100px" }}
          size="large"
          options={[
            { value: "manager", label: "管理員" },
            { value: "editor", label: "成員" },
            { value: "viewer", label: "一般" },
          ]}
        />
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

export default UserList;
