import React from "react";
import { MemberModalCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { newBoardApi } from "@/api/boards";
import { NewBoardsProps } from "@/interfaces/boards";
import { Button, Form } from "antd";

const RemoveMember: React.FC<{
  open: boolean;
  setOpen: Function;
  organizationId: string;
  getOrganization: Function;
  removeBtnText: string;
}> = ({ open, setOpen, organizationId, getOrganization, removeBtnText }) => {
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
      title={<p style={{ textAlign: "center" }}>移除或停用成員</p>}
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
        <Form.Item name="exit">
          <Button
            type="text"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "80px",
              textAlign: "left",
              margin: "8px 0px",
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
              {removeBtnText === "退 出" ? "離開工作區" : "從工作區中移除"}
            </p>
            移除所有對此工作區的存取動作。
          </Button>
        </Form.Item>
      </Form>
    </MemberModalCss>
  );
};
export default RemoveMember;
