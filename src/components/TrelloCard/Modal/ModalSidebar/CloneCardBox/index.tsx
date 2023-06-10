import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Spin } from "antd";
import { postCloneCardApi } from "@/api/cards";
import { useParamCard } from "@/hooks/useParamCard";
import { useNavigate } from "react-router";
import CardCascader from "./CardCascader";

type FormValue = {
  name: string;
  cascader: [string, string, string, number];
};

const CloneCardBox: React.FC = () => {
  const navigate = useNavigate();
  const cardData = useParamCard();
  const [form] = Form.useForm<FormValue>();
  const [state, setState] = useState({
    isLoading: false,
    isPopoverOpen: false,
  });

  const onFinish = async ({
    name,
    cascader: [, boardId, listId, position],
  }: FormValue) => {
    if (!cardData) {
      return;
    }
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    try {
      await postCloneCardApi({
        name,
        boardId,
        listId,
        sourceCardId: cardData.id,
        position: `${position}`,
      });
    } catch (error) {}

    navigate(`/board/${boardId}`);
    setState({
      isPopoverOpen: false,
      isLoading: false,
    });
  };

  return (
    <Popover
      placement="bottom"
      trigger="click"
      open={state.isPopoverOpen}
      onOpenChange={(visible) => {
        setState({
          isLoading: false,
          isPopoverOpen: visible,
        });
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          複製卡片
        </div>
      }
      content={
        <Spin spinning={state.isLoading}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="標題"
              name="name"
              rules={[
                {
                  required: true,
                  message: "請輸入標題!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="複製到..."
              name="cascader"
              rules={[
                {
                  required: true,
                  message: "請選擇位置!",
                },
              ]}
            >
              <CardCascader />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                建立卡片
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      }
    >
      <a className="button-link">
        <span style={{ marginRight: "6px" }}>
          <CopyOutlined />
        </span>
        <span>複製</span>
      </a>
    </Popover>
  );
};

export default CloneCardBox;
