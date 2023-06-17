import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Cover from "@/assets/images/img_cover.png";
import { useAppDispatch } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { newBoardAction } from "@/redux/boardSlice";
import { AddBoardsCss } from "./style";

const AddBoards: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const organizationId = useParamOrganization()?._id;
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<{
    name: string;
    permission: string;
    templateId: string;
  }>();
  const boardName = Form.useWatch("name", form);
  const onFinish = async (values: {
    name: string;
    permission: string;
    templateId: string;
  }) => {
    if (!organizationId) {
      return;
    }
    setButtonLoading(true);

    try {
      await dispatch(
        newBoardAction({
          name: values.name,
          organizationId,
          permission: values.permission,
          templateId: values.templateId ?? false,
        })
      );
    } catch (error) {}

    setOpen(false);
    setButtonLoading(false);
  };
  return (
    <AddBoardsCss
      title={<p style={{ textAlign: "center" }}>建立看板</p>}
      width={351}
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
    >
      <img src={Cover} alt="" className="head-img" />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="看板名稱" name="name">
          <Input value={boardName} style={{ height: "48px" }} />
        </Form.Item>
        <Form.Item label={"觀看權限"} name="permission" initialValue="private">
          <Select
            options={[
              { value: "private", label: "私人" },
              { value: "public", label: "公開" },
            ]}
          />
        </Form.Item>
        <Form.Item label={"從範本建立"} name="templateId">
          <Select
            // TODO:id 先寫死
            options={[
              {
                value: "648cb6e683293211dd40b042",
                label: "Remote Team Meetings",
              },
              {
                value: "648da7ffbafd38ad47f4f26d",
                label: "1-on-1 Meeting Agenda",
              },
              {
                value: "648db08abafd38ad47f4f464",
                label: "Agile Board Template | Lunar",
              },
            ]}
            onSelect={(_, option) => {
              form.setFieldValue("name", option.label);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={buttonLoading}
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
