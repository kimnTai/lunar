import React, { useState } from "react";
import { useParams } from "react-router";
import { Form, Radio, Spin } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import {
  OrganizationMemberProps,
  UpdateOrganizationMemberProps,
} from "@/interfaces/organization";
import { updateOrganizationMemberAction } from "@/redux/organizationSlice";
import { MemberModalCss } from "./style";

const ManageRole: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMember: OrganizationMemberProps | null;
}> = ({ open, setOpen, selectedMember }) => {
  const { workSpaceId } = useParams();
  const [form] = Form.useForm();
  const userId = selectedMember?.userId._id;
  const dispatch = useAppDispatch();
  const [spinning, setSpinning] = useState(false);

  const onFinish = async (values: UpdateOrganizationMemberProps) => {
    if (!workSpaceId) {
      return;
    }
    setSpinning(true);

    dispatch(
      updateOrganizationMemberAction({
        organizationId: workSpaceId,
        memberId: userId || "",
        role: values.role,
      })
    ).finally(() => {
      setOpen(false);
      setSpinning(false);
    });
  };

  return (
    <MemberModalCss
      title={<p style={{ textAlign: "center" }}>更改許可設定</p>}
      width={332}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Spin spinning={spinning}>
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
      </Spin>
    </MemberModalCss>
  );
};

export default ManageRole;
