import React from "react";
import { InviteMemberCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { newBoardApi } from "@/api/boards";
import { NewBoardsProps } from "@/interfaces/boards";
import { Button, Col, Form, Input, Row } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const InviteMember: React.FC<{
  open: boolean;
  setOpen: Function;
  organizationId: string;
}> = ({ open, setOpen, organizationId }) => {
  const [_form] = Form.useForm<NewBoardsProps>();
  const onCancel: () => void = () => {
    setOpen(false);
  };
  const [_result, loading, callApi] = useApi(newBoardApi);

  const onFinish = async (values: NewBoardsProps) => {
    // await callApi({
    //   name: values.name,
    //   organizationId,
    //   permission: values.permission,
    // });

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
        // form={form}
        onFinish={onFinish}
        layout="vertical"
        // style={{ marginTop: "16px" }}
      >
        <Form.Item name="email">
          <Input style={{ height: "36px" }} />
        </Form.Item>
        <Form.Item name="inviteLink">
          <Row align={"middle"}>
            <LinkOutlined
              style={{
                padding: "12px",
                backgroundColor: "var(--grayd5)",
                borderRadius: "2px",
              }}
            />
            <Col style={{ marginLeft: "16px" }}>
              <Row align={"middle"} justify={"center"}>
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

              <Button
                style={{
                  padding: "0",
                  margin: "0",
                  color: "var(--grey9F)",
                  textDecoration: "underline",
                }}
                type="link"
              >
                建立連結
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </InviteMemberCss>
  );
};
export default InviteMember;
