import { useState, useRef, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { ColorIcon } from "../Icons";
import PermissionBtn from "./PermissionBtn";
import { updateOrganizationAction } from "@/redux/organizationSlice";
import { useAppDispatch } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const WorkSpaceHeader: React.FC = () => {
  const paramOrganization = useParamOrganization();
  const [isEdit, setIsEdit] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const formRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const updateOrganizationName = (
    values: Parameters<typeof updateOrganizationAction>[0]
  ) => {
    if (!paramOrganization?._id) {
      return;
    }

    setSpinning(true);

    dispatch(
      updateOrganizationAction({
        organizationId: paramOrganization._id,
        name: values.name,
      })
    ).finally(() => {
      setIsEdit(false);
      setSpinning(false);
    });
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(target as Node)
      ) {
        setIsEdit(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

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
        <Row
          align={"middle"}
          justify={"center"}
          style={{ marginBottom: "8px" }}
          ref={containerRef}
        >
          {isEdit ? (
            <Spin spinning={spinning}>
              <Form
                onFinish={updateOrganizationName}
                initialValues={{ name: paramOrganization?.name }}
                style={{ display: "flex", gap: "4px" }}
                ref={formRef}
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

export default WorkSpaceHeader;
