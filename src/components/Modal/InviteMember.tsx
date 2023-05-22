import React, { useState } from "react";
import { InviteMemberCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { Avatar, Button, Form, List, Row, Select, Spin } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import {
  OrganizationProps,
  addOrganizationMemberProps,
} from "@/interfaces/organization";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import { searchLunarMemberApi } from "@/api/search";

const InviteMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId: string;
  userOrganization?: OrganizationProps;
}> = ({ open, setOpen, userOrganization, organizationId }) => {
  const [result, loading, callApi] = useApi(searchLunarMemberApi);
  const [form] = Form.useForm<addOrganizationMemberProps>();
  const [selectedUsers, setSelectedUsers] = useState<{ userId: string }[]>([]);
  const handleSelectChange = (values: string[]) => {
    console.log({ userId: [...values] });
    const userIdList = values.map((value) => ({ userId: value }));
    setSelectedUsers(userIdList);
  };
  const onCancel: () => void = () => {
    setOpen(false);
  };
  const onFinish = async () => {
    console.log(selectedUsers);
  };
  const onSearch = async (value: string) => {
    if (value.length >= 1) {
      await callApi({
        query: value,
        organizationId,
      });
    }
  };
  const filteredUsers = result?.result.filter(
    (user: any) => !selectedUsers.includes(user.value)
  );

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
            <Select
              mode="multiple"
              showSearch
              style={{ height: "auto" }}
              placeholder="請輸入姓名或電子郵件"
              filterOption={false}
              onSearch={onSearch}
              loading={loading}
              notFoundContent={
                loading ? (
                  <Row justify={"center"} style={{ padding: "8px" }}>
                    <Spin />
                  </Row>
                ) : (
                  result?.result.length === 0 && (
                    <p style={{ textAlign: "center", padding: "8px" }}>
                      這個人似乎尚未註冊 Lunar。
                    </p>
                  )
                )
              }
              value={selectedUsers.map((user) => user.userId)}
              onChange={handleSelectChange}
              optionLabelProp="email"
            >
              {filteredUsers?.map((user, index: number) => (
                <Select.Option key={index} value={user.name} email={user.email}>
                  <List itemLayout="horizontal">
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={user.avatar} />}
                        title={user.name}
                        description={user.email}
                      />
                    </List.Item>
                  </List>
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" htmlType="submit">
              傳送邀請
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
              onCancel={onCancel}
            />
          </Row>
        </Form.Item>
      </Form>
    </InviteMemberCss>
  );
};
export default InviteMember;
