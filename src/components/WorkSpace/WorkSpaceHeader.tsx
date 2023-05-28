import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { ColorIcon } from "../Icons";
import PermissionBtn from "./PermissionBtn";
import { updateOrganizationAction } from "@/redux/actions/OrganizationAction";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useParamOrganization } from "@/hooks/useParamOrganization";

export const WorkSpaceHeader: React.FC = () => {
  const paramOrganization = useParamOrganization();
  const [isEdit, setIsEdit] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const dispatch = useAppDispatch();

  const UpdateOrganizationName = (
    values: Parameters<typeof updateOrganizationAction>[0]
  ) => {
    if (!paramOrganization?._id) {
      return;
    }

    setSpinning(true);

    updateOrganizationAction({
      organizationId: paramOrganization._id,
      name: values.name,
    })(dispatch).finally(() => {
      setIsEdit(false);
      setSpinning(false);
    });
  };

  return (
    <Row>
      <ColorIcon
        color={"white"}
        text={paramOrganization?.name.at(0) || ""}
        fontSize={"32px"}
        size={"72px"}
        background={"var(--blue)"}
      />
      <Col className="workSpace" style={{ marginLeft: "16px" }}>
        <Row align={"middle"} justify={"center"}>
          {isEdit ? (
            <Spin spinning={spinning}>
              <Form
                onFinish={UpdateOrganizationName}
                initialValues={{ name: paramOrganization?.name }}
                style={{ display: "flex", gap: "4px" }}
              >
                <Form.Item name="name" style={{ marginBottom: "8px" }}>
                  <Input />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  儲存
                </Button>
              </Form>
            </Spin>
          ) : (
            <>
              <h2>{paramOrganization?.name}</h2>
              <Button
                style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => setIsEdit(true)}
              />
            </>
          )}
        </Row>
        <PermissionBtn permission={paramOrganization?.permission!} id={null} />
      </Col>
    </Row>
  );
};
