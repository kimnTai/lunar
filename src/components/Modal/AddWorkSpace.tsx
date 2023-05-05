import React from "react";
import { AddWorkSpaceCss } from "./style";
import { Button, Form, Input } from "antd";
import { NewOrganizationFormProps as FormValues } from "@/interfaces/organization";
import { useApi } from "@/hooks/useApiHook";
import { newOrganizationApi } from "@/api/organization";

const AddWorkSpace: React.FC<{
  open: boolean;
  setOpen: Function;
  getOrganization: Function;
}> = ({ open, setOpen, getOrganization }) => {
  const [form] = Form.useForm<FormValues>();
  const onCancel: () => void = () => {
    setOpen(false);
  };
  const [_result, loading, callApi] = useApi(newOrganizationApi);

  const onFinish = async (values: FormValues) => {
    await callApi({ name: values.name });
    await getOrganization();
    onCancel();
  };
  return (
    <AddWorkSpaceCss open={open} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div>
          <h2>讓我們開始打造工作區吧</h2>
          <p>讓大家更容易在同一位置存取看板，以提高你的工作效率。</p>
        </div>
        <Form.Item label="工作區名稱" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <div className="d-space">
              <h3>邀請你的團隊</h3>
              <a>以鏈結邀請</a>
            </div>
          }
          name="invite"
          className="invite"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            繼續
          </Button>
        </Form.Item>
      </Form>
    </AddWorkSpaceCss>
  );
};

export default AddWorkSpace;
