import { updateOrganizationApi } from "@/api/organization";
import { useApi } from "@/hooks/useApiHook";
import {
  OrganizationProps,
  UpdateOrganizationProps,
} from "@/interfaces/organization";
import { EditOutlined, GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { ColorIcon } from "../Icons";

export const WorkSpaceHeader: React.FC<{
  userOrganization?: OrganizationProps;
  organizationId: string;
  getOrganization: Function;
}> = ({ userOrganization, organizationId, getOrganization }) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const [_result, loading, callApi] = useApi(updateOrganizationApi);

  const UpdateOrganizationName = async (values: UpdateOrganizationProps) => {
    await callApi({
      organizationId,
      name: values.name,
    });
    await getOrganization();
    setIsEdit(false);
  };

  return (
    <Row>
      <ColorIcon
        color={"white"}
        text={userOrganization?.name[0] || ""}
        fontSize={"32px"}
        size={"72px"}
        background={"var(--blue)"}
      />
      <Col className="workSpace" style={{ marginLeft: "16px" }}>
        <Row align={"middle"} justify={"center"}>
          {isEdit ? (
            <Form
              onFinish={UpdateOrganizationName}
              initialValues={{ name: userOrganization?.name }}
              style={{ display: "flex", gap: "4px" }}
            >
              <Form.Item name="name" style={{ marginBottom: "8px" }}>
                <Input />
              </Form.Item>
              <Button htmlType="submit" type="primary" loading={loading}>
                儲存
              </Button>
            </Form>
          ) : (
            <>
              <h2>{userOrganization?.name}</h2>
              <Button
                style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEdit(true)}
              />
            </>
          )}
        </Row>
        <Row
          align={"middle"}
          justify={"start"}
          style={{
            marginTop: "8px",
            gap: "4px",
          }}
        >
          {userOrganization?.permission === "private" ? (
            <>
              <LockOutlined
                style={{
                  color: "red",
                  fontSize: "12px",
                }}
              />
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "22px",
                  color: "red",
                }}
              >
                私密
              </p>
            </>
          ) : (
            <>
              <GlobalOutlined
                style={{
                  color: "green",
                  fontSize: "12px",
                }}
              />
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "22px",
                  color: "green",
                }}
              >
                公開
              </p>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};
