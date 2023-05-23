import React, { useState } from "react";
import { AddWorkSpaceCss } from "./style";
import { Button, Form, Input } from "antd";
import { NewOrganizationFormProps } from "@/interfaces/organization";
import { newOrganizationApi } from "@/api/organization";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import CONSTANTS from "@/redux/constants";

const AddWorkSpace: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [form] = Form.useForm<NewOrganizationFormProps>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish = async (values: NewOrganizationFormProps) => {
    setButtonLoading(true);

    newOrganizationApi({ name: values.name })
      .then((res) => {
        dispatch({
          type: CONSTANTS.CREATE_NEW_ORGANIZATION,
          payload: res.result,
        });
      })
      .finally(() => {
        setButtonLoading(false);
        setOpen(false);
      });
  };
  return (
    <AddWorkSpaceCss open={open} onCancel={() => setOpen(false)} footer={null}>
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
          <Button type="primary" htmlType="submit" loading={buttonLoading}>
            繼續
          </Button>
        </Form.Item>
      </Form>
    </AddWorkSpaceCss>
  );
};

export default AddWorkSpace;
