import React, { useEffect, useState } from "react";
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
  const [form] = Form.useForm<addOrganizationMemberProps>();
  const [options, setOptions] = useState<
    Array<{ label: string; value: string; avatar: string }>
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<{ userId: string }[]>(
    []
  );
  const [showNotFound, setShowNotFound] = useState(false);

  const handleSelectChange = (values: string[]) => {
    const updatedOptions = values.map((value) => ({ userId: value }));
    setSelectedOptions(updatedOptions);
    setShowNotFound(false);
  };

  const onCancel: () => void = () => {
    setOpen(false);
  };

  const [result, loading, callApi] = useApi(searchLunarMemberApi);

  const onFinish = async (values: addOrganizationMemberProps) => {
    console.log(values);
    // onCancel();
  };
  const onSearch = async (value: string) => {
    if (value.length >= 1) {
      await callApi({
        query: value,
        organizationId,
      });
      setShowNotFound(true);
    } else {
      setOptions([]);
      setShowNotFound(false);
    }
  };

  const filteredOptions = options.filter(
    (option: any) => !selectedOptions.includes(option.value)
  );

  useEffect(() => {
    if (result?.result) {
      const transformedOptions = result.result.map((item) => ({
        label: item.name,
        value: item.email,
        avatar: item.avatar,
        userId: item._id,
      }));
      setOptions(transformedOptions);
    } else {
      setOptions([]);
    }
  }, [result]);

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
                  showNotFound && (
                    <p style={{ textAlign: "center", padding: "8px" }}>
                      這個人似乎尚未註冊 Lunar。
                    </p>
                  )
                )
              }
              value={selectedOptions.map((option) => option.userId)}
              onChange={handleSelectChange}
              optionLabelProp="email"
            >
              {filteredOptions.map((option: any) => (
                <Select.Option
                  key={option.value}
                  value={option.userId}
                  email={option.value}
                >
                  <List itemLayout="horizontal">
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={option.avatar} />}
                        title={option.label}
                        description={option.value}
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
