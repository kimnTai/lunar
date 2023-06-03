import React, { useState } from "react";
import { InviteMemberCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { Button, Col, Form, Row } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { addOrganizationMemberProps } from "@/interfaces/organization";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import {
  addOrganizationMemberApi,
  generateInviteLinkApi,
} from "@/api/organization";
import InviteMemberSelect from "../WorkSpace/InviteMemberSelect";
import { getOrganizationsAction } from "@/redux/organizationSlice";
import { useAppDispatch } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const InviteMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const userOrganization = useParamOrganization();
  const organizationId = useParamOrganization()?._id || "";
  const [_result, loading, callApi] = useApi(addOrganizationMemberApi);
  const [form] = Form.useForm<addOrganizationMemberProps>();
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });
  const [loadingLink, setLoadingLink] = useState(false);

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

    dispatch(getOrganizationsAction());

    onCancel();
  };

  const handleGenerateInviteLink = async () => {
    setLoadingLink(true);
    await generateInviteLinkApi(organizationId);

    dispatch(getOrganizationsAction());
    setLoadingLink(false);
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
                  backgroundColor: "var(--link-background)",
                  borderRadius: "2px",
                }}
              />
              <Col>
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "22px",
                  }}
                >
                  使用連結邀請某人加入此工作區
                </p>
                <Button
                  type="link"
                  style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "22px",
                    color: "var(--gray9)",
                    textDecorationLine: "underline",
                    padding: 0,
                    height: "auto",
                  }}
                  onClick={handleGenerateInviteLink}
                  loading={loadingLink}
                >
                  {userOrganization?.inviteLink ? "停用連結" : "建立連結"}
                </Button>
              </Col>
            </Row>
            {userOrganization?.inviteLink && (
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
            )}
          </Row>
        </Form.Item>
      </Form>
    </InviteMemberCss>
  );
};
export default InviteMember;
