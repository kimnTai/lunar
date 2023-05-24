import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Layout, Row } from "antd";
import { NewOrganizationFormProps as FormValues } from "@/interfaces/organization";
import { useApi } from "@/hooks/useApiHook";
import { newOrganizationApi } from "@/api/organization";
import { NewWorkSpaceCss } from "./style";
import Logo from "@/assets/images/img_logo.png";
import Bg from "@/assets/images/newWorkSpace_bg.png";
import CreateWork from "@/assets/images/img_createWork.png";
import type { PropsFromRedux } from "@/router";
import InviteMemberSelect from "@/components/WorkSpace/InviteMemberSelect";

const NewWorkSpace: React.FC<{
  getOrganization: PropsFromRedux["getOrganization"];
}> = ({ getOrganization }) => {
  const [form] = Form.useForm<FormValues>();
  const [_result, loading, callApi] = useApi(newOrganizationApi);
  const [selectedUsers, setSelectedUsers] = useState<{ userIdList: string[] }>({
    userIdList: [],
  });

  const navigate = useNavigate();
  const onFinish = async (values: FormValues) => {
    await callApi({ name: values.name, userIdList: selectedUsers.userIdList });
    await getOrganization();
    navigate("/");
  };

  return (
    <Layout style={{ height: "100%" }}>
      <div className="header" style={{ padding: "24px 166px" }}>
        <img src={Logo} alt="" />
      </div>
      <NewWorkSpaceCss className="d-center">
        <img src={Bg} alt="" className="bg-left" />
        <Row>
          <Col>
            <img src={CreateWork} alt="" />
          </Col>
          <Col>
            <h1>歡迎使用Lunar</h1>
            <div style={{ marginTop: "12px" }}>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "120%",
                  color: "var(--black23)",
                }}
              >
                開始創建工作區
              </p>
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "16px",
                  lineHeight: "120%",
                  color: "var(--gray66)",
                }}
              >
                所有人和事物都集中在一個地方。這是一個供團隊協作、組織和分享項目看的空間。
              </p>
            </div>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              style={{ marginTop: "24px" }}
            >
              <Form.Item
                label="工作區名稱（項目或團隊名稱）"
                name="name"
                extra="稍後可在您的工作區設定編輯名稱"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="誰在你的團隊？"
                name="invite"
                extra="邀請您的團隊成員，便於他們看到你正在處理的工作。"
              >
                <InviteMemberSelect
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ height: "48px", width: "100%" }}
                >
                  創建工作區
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </NewWorkSpaceCss>
    </Layout>
  );
};

export default NewWorkSpace;
