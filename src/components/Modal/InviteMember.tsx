import React, { useState } from "react";
import { InviteMemberCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { Button, Form, Row } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import {
  OrganizationProps,
  addOrganizationMemberProps,
} from "@/interfaces/organization";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import { addOrganizationMemberApi } from "@/api/organization";
import InviteMemberSelect from "../WorkSpace/InviteMemberSelect";
import { PropsFromRedux } from "@/router";

const InviteMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId: string;
  userOrganization?: OrganizationProps;
  getOrganization: PropsFromRedux["getOrganization"];
}> = ({ open, setOpen, userOrganization, organizationId, getOrganization }) => {
  const [_result, loading, callApi] = useApi(addOrganizationMemberApi);
  const [form] = Form.useForm<addOrganizationMemberProps>();
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });

  const onCancel = () => {
    setOpen(false);
  };

  const onFinish = async () => {
    await callApi({
      organizationId,
      userIdList: selectedUsers.userIdList,
    });

    setSelectedUsers({
      userIdList: [],
    });

    await getOrganization();

    onCancel();
  };

  return (
    <InviteMemberCss
      title={<p style={{ textAlign: "center" }}>邀請加入工作區</p>}
      width={572}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        // style={{ marginTop: "16px" }}
      >
        <Form.Item name={"user"}>
          <Row
            align={"middle"}
            justify={"space-between"}
            style={{ flexWrap: "nowrap", gap: "4px" }}
          >
            <InviteMemberSelect
              organizationId={organizationId}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
            <Button type="primary" htmlType="submit" loading={loading}>
              邀請加入
            </Button>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row align={"middle"} justify={"space-between"}>
            <Row align={"middle"} style={{ gap: "4px" }}>
              <LinkOutlined
                style={{
                  padding: "12px",
                  backgroundColor: "var(--grayd5)",
                  borderRadius: "2px",
                }}
              />
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                使用連結邀請某人加入此工作區
              </p>
            </Row>
            <CopyInviteLinkBtn
              userOrganization={userOrganization}
              setOpen={setOpen}
              style={{
                backgroundColor: "white",
                color: "var(--black23)",
                width: "130px",
                height: "32px",
              }}
            />
          </Row>
        </Form.Item>
      </Form>
    </InviteMemberCss>
  );
};
export default InviteMember;
