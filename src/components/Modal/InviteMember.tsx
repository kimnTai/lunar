import React, { useState } from "react";
import { Button, Col, Form, Row, Spin } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import InviteMemberSelect from "@/components/WorkSpace/InviteMemberSelect";
import { useAppDispatch } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { addOrganizationMemberProps } from "@/interfaces/organization";
import {
  addOrganizationMemberAction,
  generateInviteLinkAction,
} from "@/redux/organizationSlice";
import { InviteMemberCss } from "./style";

const InviteMember: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const userOrganization = useParamOrganization();
  const organizationId = useParamOrganization()?._id || "";
  const [spinning, setSpinning] = useState(false);
  const [form] = Form.useForm<addOrganizationMemberProps>();
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });

  const onFinish = async () => {
    setSpinning(true);

    try {
      await dispatch(
        addOrganizationMemberAction({
          organizationId,
          userIdList: selectedUsers.userIdList,
        })
      );
    } catch (error) {}

    setSelectedUsers({
      userIdList: [],
    });
    setOpen(false);
    setSpinning(false);
    form.resetFields();
  };

  const handleGenerateInviteLink = async () => {
    setSpinning(true);

    try {
      await dispatch(generateInviteLinkAction(organizationId));
    } catch (error) {}

    setSpinning(false);
  };

  return (
    <InviteMemberCss
      title={<p style={{ textAlign: "center" }}>邀請加入工作區</p>}
      width={572}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <Spin spinning={spinning}>
        <Form form={form} onFinish={onFinish} layout="vertical">
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
              <Button type="primary" htmlType="submit">
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
                  >
                    {userOrganization?.inviteLink ? "停用連結" : "建立連結"}
                  </Button>
                </Col>
              </Row>
              {userOrganization?.inviteLink && (
                <CopyInviteLinkBtn
                  organizationInviteLink={userOrganization.inviteLink}
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
      </Spin>
    </InviteMemberCss>
  );
};

export default InviteMember;
