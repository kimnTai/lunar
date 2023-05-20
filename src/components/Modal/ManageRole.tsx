import React from "react";
import { MemberModalCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { updateOrganizationMemberApi } from "@/api/organization";
import { Form, Radio } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  OrganizationMemberProps,
  UpdateOrganizationMemberProps,
} from "@/interfaces/organization";
import { useForm } from "antd/lib/form/Form";
import { PropsFromRedux } from "@/router";

const ManageRole: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId: string;
  getOrganization: PropsFromRedux["getOrganization"];
  selectedMember: OrganizationMemberProps | null;
}> = ({ open, setOpen, organizationId, getOrganization, selectedMember }) => {
  const onCancel = () => {
    setOpen(false);
  };
  const [form] = useForm();
  const userId = selectedMember?.userId._id;

  const [_result, _loading, callApi] = useApi(updateOrganizationMemberApi);
  const onFinish = async (values: UpdateOrganizationMemberProps) => {
    await callApi({
      organizationId,
      memberId: userId || "",
      role: values.role,
    });
    await getOrganization();
    onCancel();
  };

  return (
    <MemberModalCss
      title={<p style={{ textAlign: "center" }}>更改許可設定</p>}
      width={332}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="role">
          <Radio.Group size="large">
            <Radio.Button
              value="manager"
              style={{
                textAlign: "left",
                border: "0",
                width: "100%",
                padding: "4px 15px",
                margin: "8px 0 4px 0",
              }}
              onClick={() => form.submit()}
            >
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                管理員
                {selectedMember?.role === "manager" && (
                  <CheckOutlined style={{ fontSize: "14px" }} />
                )}
              </p>
              <span
                style={{
                  lineHeight: "24px",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                可以查看、建立及編輯工作區看板，並可以為工作區更改設定。在此工作區中的所有看板上將擁有管理員權限。
              </span>
            </Radio.Button>
            <Radio.Button
              value="viewer"
              style={{
                textAlign: "left",
                border: "0",
                width: "100%",
                padding: "4px 15px",
                margin: "4px 0 8px 0",
              }}
              onClick={() => form.submit()}
            >
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                一般
                {selectedMember?.role === "viewer" && (
                  <CheckOutlined style={{ fontSize: "14px" }} />
                )}
              </p>
              <span
                style={{
                  lineHeight: "24px",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                可以查看、建立及編輯工作區看板，但不能更改設定。
              </span>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </MemberModalCss>
  );
};
export default ManageRole;
