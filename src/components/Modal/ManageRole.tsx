import React from "react";
import { MemberModalCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { newBoardApi } from "@/api/boards";
import { NewBoardsProps } from "@/interfaces/boards";
import { Button, Form } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { OrganizationMemberProps } from "@/interfaces/organization";

const ManageRole: React.FC<{
  open: boolean;
  setOpen: Function;
  organizationId: string;
  getOrganization: Function;
  selectedMember: OrganizationMemberProps | null;
}> = ({ open, setOpen, organizationId, getOrganization, selectedMember }) => {
  const [_form] = Form.useForm<NewBoardsProps>();
  const onCancel: () => void = () => {
    setOpen(false);
  };

  const [_result, loading, callApi] = useApi(newBoardApi);
  const onFinish = async (values: NewBoardsProps) => {
    await callApi({
      name: values.name,
      organizationId,
      permission: values.permission,
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
      <Form
        // form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="manager">
          <Button
            type="text"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "auto",
              textAlign: "left",
              margin: "8px 0px 4px 0px",
            }}
            block
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
            可以查看、建立及編輯工作區看板，並可以為工作區更改設定。在此工作區中的所有看板上將擁有管理員權限。
          </Button>
        </Form.Item>
        <Form.Item name="viewer">
          <Button
            type="text"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "auto",
              textAlign: "left",
              margin: "4px 0px 8px 0px",
            }}
            block
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
            可以查看、建立及編輯工作區看板，但不能更改設定。
          </Button>
        </Form.Item>
      </Form>
    </MemberModalCss>
  );
};
export default ManageRole;
