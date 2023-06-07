import React, { useState } from "react";
import { AddBoardsCss } from "./style";
import { newBoardAction } from "@/redux/boardSlice";
import { NewBoardsProps } from "@/interfaces/boards";
import { Button, Form, Input, Select } from "antd";
import Cover from "@/assets/images/img_cover.png";
import { useAppDispatch } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const AddBoards: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const organizationId = useParamOrganization()?._id;
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish = async (values: NewBoardsProps) => {
    if (!organizationId) {
      return;
    }
    setButtonLoading(true);

    dispatch(
      newBoardAction({
        name: values.name,
        organizationId,
        permission: values.permission,
      })
    ).finally(() => {
      setOpen(false);
      setButtonLoading(false);
    });
  };
  return (
    <AddBoardsCss
      title={<p style={{ textAlign: "center" }}>建立看板</p>}
      width={351}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <img src={Cover} alt="" className="head-img" />
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="看板名稱" name="name">
          <Input style={{ height: "48px" }} />
        </Form.Item>
        <Form.Item label={"觀看權限"} name="permission" initialValue="private">
          <Select>
            <Select.Option value="private">私人</Select.Option>
            <Select.Option value="public">公開</Select.Option>
          </Select>
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
