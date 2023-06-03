import React from "react";
import { MemberModalCss } from "./style";
import { Form, Radio } from "antd";
import { CheckOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { UpdateOrganizationProps } from "@/interfaces/organization";
import { useForm } from "antd/lib/form/Form";
import { useAppDispatch } from "@/hooks";
import { updateOrganizationAction } from "@/redux/organizationSlice";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const ManagePermission: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const userOrganization = useParamOrganization();
  const [form] = useForm();

  const dispatch = useAppDispatch();

  const onFinish = async (values: UpdateOrganizationProps) => {
    dispatch(
      updateOrganizationAction({
        organizationId: userOrganization?._id || "",
        permission: values.permission,
      })
    ).finally(() => {
      setOpen(false);
    });
  };

  return (
    <MemberModalCss
      title={<p style={{ textAlign: "center" }}>選取工作區觀看權限</p>}
      width={332}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="permission">
          <Radio.Group size="large">
            <Radio.Button
              value="private"
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
                <LockOutlined /> 私人{" "}
                {userOrganization?.permission === "private" && (
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
                這是私人工作區。此工作區沒有編入索引、也不開放工作區以外的成員觀看
              </span>
            </Radio.Button>
            <Radio.Button
              value="public"
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
                <GlobalOutlined /> 公開{" "}
                {userOrganization?.permission === "public" && (
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
                這些是公開的工作區。任何擁有此連結的人皆可觀看這些工作區，同時這些工作區也會出現在搜尋引擎
                (如 Google)
                結果中。只有獲邀加入這些工作區的人員可以新增及編輯工作區看板。
              </span>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </MemberModalCss>
  );
};
export default ManagePermission;
