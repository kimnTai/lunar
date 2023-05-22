import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import ListButton from "./ListButton";
import { CopyOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useParams } from "react-router";
import { postCloneBoardApi } from "@/api/boards";

type FormValues = { name: string; organizationId: string };

const CloneBoardButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const { boardId } = useParams();
  const options = useAppSelector((state) =>
    state.user.organization.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }))
  );

  const onFinish = async (value: FormValues) => {
    if (boardId) {
      setIsModalOpen(false);
      await postCloneBoardApi({
        ...value,
        sourceBoardId: boardId,
      });
      alert("複製完成");
    }
  };

  return (
    <>
      <ListButton
        icon={
          <CopyOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
        }
        text="複製看板"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        footer={null}
        title="複製看板"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="名稱" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="organizationId"
            label="組織"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(value) => {
                form.setFieldsValue({ organizationId: value });
              }}
              allowClear
              options={options}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" type="primary">
              新建
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CloneBoardButton;
