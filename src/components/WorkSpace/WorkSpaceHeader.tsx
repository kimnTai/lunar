import { useState } from "react";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { updateOrganizationAction } from "@/redux/organizationSlice";
import { selectUser } from "@/redux/userSlice";
import { ColorIcon } from "../Icons";
import PermissionBtn from "./PermissionBtn";

const WorkSpaceHeader: React.FC = () => {
  const organization = useParamOrganization();
  const user = useAppSelector(selectUser);
  const orgUser = organization?.member.find(
    ({ userId }) => userId._id === user._id
  );
  const [isEdit, setIsEdit] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const dispatch = useAppDispatch();

  const updateOrganizationName = (
    values: Parameters<typeof updateOrganizationAction>[0]
  ) => {
    if (!organization?._id) {
      return;
    }

    setSpinning(true);

    dispatch(
      updateOrganizationAction({
        organizationId: organization._id,
        name: values.name,
      })
    ).finally(() => {
      setIsEdit(false);
      setSpinning(false);
    });
  };

  return (
    <Row>
      <ColorIcon
        color={"white"}
        text={organization?.name.at(0) || ""}
        fontSize={"32px"}
        size={"72px"}
        background={"var(--blue)"}
      />
      <Col className="workSpace" style={{ marginLeft: "16px" }}>
        <Row
          align={"middle"}
          justify={"center"}
          style={{ marginBottom: "8px" }}
          onBlur={() => setIsEdit(false)}
        >
          {isEdit ? (
            <Spin spinning={spinning}>
              <Form
                onFinish={updateOrganizationName}
                initialValues={{ name: organization?.name }}
                style={{ display: "flex", gap: "4px" }}
              >
                <Form.Item name="name" style={{ marginBottom: "8px" }}>
                  <Input
                    ref={(input) => {
                      if (input) {
                        input.focus();
                        setIsEdit(true);
                      }
                    }}
                  />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  儲存
                </Button>
              </Form>
            </Spin>
          ) : (
            <>
              <h2>{organization?.name}</h2>
              {orgUser?.role === "manager" && (
                <Button
                  style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => setIsEdit(true)}
                />
              )}
            </>
          )}
        </Row>
        <PermissionBtn permission={organization?.permission!} id={null} />
      </Col>
    </Row>
  );
};

export default WorkSpaceHeader;
