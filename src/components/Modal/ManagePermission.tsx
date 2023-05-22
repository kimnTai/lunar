import React from "react";
import { MemberModalCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { updateOrganizationApi } from "@/api/organization";
import { Form, Radio } from "antd";
import { CheckOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import {
  OrganizationProps,
  UpdateOrganizationProps,
} from "@/interfaces/organization";
import { useForm } from "antd/lib/form/Form";
import { PropsFromRedux } from "@/router";

const ManagePermission: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  organizationId: string;
  getOrganization: PropsFromRedux["getOrganization"];
  userOrganization?: OrganizationProps;
}> = ({ open, setOpen, organizationId, getOrganization, userOrganization }) => {
  const onCancel = () => {
    setOpen(false);
  };
  const [form] = useForm();

  const [_result, _loading, callApi] = useApi(updateOrganizationApi);
  const onFinish = async (values: UpdateOrganizationProps) => {
    await callApi({
      organizationId,
      permission: values.permission,
    });
    await getOrganization();
    onCancel();
  };

  return (
    <MemberModalCss
      title={<p style={{ textAlign: "center" }}>選取工作區觀看權限</p>}
      width={332}
      open={open}
      onCancel={onCancel}
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
                <LockOutlined /> 私密{" "}
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
