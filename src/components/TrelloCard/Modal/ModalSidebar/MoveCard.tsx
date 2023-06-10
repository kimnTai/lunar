import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Popover, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { moveCardAction } from "@/redux/cardSlice";
import CardCascader from "./CardCascader";

type FormValue = {
  name: string;
  cascader: [string, string, string, number];
};

const MoveCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardData = useParamCard();
  const [form] = Form.useForm<FormValue>();
  const [state, setState] = useState({
    isLoading: false,
    isPopoverOpen: false,
  });

  const onFinish = async ({
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
      await dispatch(
        moveCardAction({
          boardId,
          listId,
          cardId: cardData.id,
          position: `${position}`,
        })
      );
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
          移動卡片
        </div>
      }
      content={
        <Spin spinning={state.isLoading}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <CardCascader
              label="移動到..."
              name="cascader"
              rules={[
                {
                  required: true,
                  message: "請選擇位置!",
                },
              ]}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                移動
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      }
    >
      <a className="button-link">
        <span style={{ marginRight: "6px" }}>
          <ArrowRightOutlined />
        </span>
        <span>移動</span>
      </a>
    </Popover>
  );
};

export default MoveCard;
