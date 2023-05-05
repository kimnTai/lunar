import React from "react";
import { AddBoardsCss } from "./style";
import { useApi } from "@/hooks/useApiHook";
import { newBoardApi } from "@/api/boards";
import { NewBoardsProps } from "@/interfaces/boards";
import { Button, Form, Input, Select } from "antd";
import Cover from "@/assets/images/img_cover.png";

const AddBorards: React.FC<{
  open: boolean;
  setOpen: Function;
  organizationId: string;
  getOrganization: Function;
}> = ({ open, setOpen, organizationId, getOrganization }) => {
  const [form] = Form.useForm<NewBoardsProps>();
  const onCancel: () => void = () => {
    setOpen(false);
  };
  const [result, loading, callApi] = useApi(newBoardApi);

  const onFinish = async (values: NewBoardsProps) => {
    console.log("===values===", values);
    await callApi({
      name: values.name,
      organizationId,
      permission: values.permission,
    });
    await getOrganization();
    onCancel();
  };
  return (
    <AddBoardsCss
      title={<p style={{ textAlign: "center" }}>建立看板</p>}
      width={351}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <img src={Cover} alt="" className="head-img" />
      <Form
        // form={form}
        onFinish={onFinish}
        layout="vertical"
        // style={{ marginTop: "16px" }}
      >
        <Form.Item label="看板名稱" name="name">
          <Input style={{ height: "48px" }} />
        </Form.Item>
        <Form.Item
          label={"觀看權限"}
          name="permission"
          initialValue="workSpace"
        >
          <Select>
            <Select.Option value="workSpace">工作區</Select.Option>
            <Select.Option value="green">私人</Select.Option>
            <Select.Option value="public">公開</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", height: "48px" }}
          >
            建立
          </Button>
        </Form.Item>
      </Form>
    </AddBoardsCss>
  );
};
export default AddBoards;
