import React, { useState } from "react";
import { AddWorkSpaceCss } from "./style";
import { Button, Form, Input, Select } from "antd";
import { NewOrganizationFormProps as FormValues } from "@/interfaces/organization";

const AddWorkSpace: React.FC<{ open: boolean; setOpen: Function }> = ({
  open,
  setOpen,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const onCancel: () => void = () => {
    setOpen(false);
  };
  const onFinish = (values: FormValues) => {
    setLoading(true);
    console.log(values);
    setTimeout(() => {
      setLoading(false);
      onCancel();
      form.resetFields();
    }, 2000);
  };
  const options = [, "", "", "人力資源", ""];
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
        <Form.Item label="工作區類型" name="type">
          <Select placeholder="select your gender">
            <Select.Option value="A">行銷</Select.Option>
            <Select.Option value="B">工程</Select.Option>
            <Select.Option value="C">預算</Select.Option>
            <Select.Option value="D">人力資源</Select.Option>
            <Select.Option value="E">教育</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="工作區描述"
          name="descript"
          extra="簡短介紹您的工作區，為您的成員做好上任準備。"
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
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
