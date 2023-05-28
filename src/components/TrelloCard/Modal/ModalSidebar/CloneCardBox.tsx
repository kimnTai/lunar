import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Cascader, Form, Input, Popover, Spin } from "antd";
import { postCloneCardApi } from "@/api/cards";
import { useCardModalContext } from "@/context/CardModalContext";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getOrganizationsAction } from "@/redux/actions/OrganizationAction";
import { nextPosition } from "@/utils/cardFunc";

const CloneCardBox: React.FC = () => {
  const { cardData } = useCardModalContext();
  const [form] = Form.useForm<{
    name: string;
    cascader: [string, string, string, number];
  }>();
  const [componentState, setComponentState] = useState({
    isLoading: false,
    isPopoverOpen: false,
  });

  const dispatch = useAppDispatch();

  const options = useAppSelector((state) => state.user.organization)
    .filter(({ board }) => {
      return board.length && board.flatMap(({ list }) => list).length;
    })
    .map(({ id, name, board }) => ({
      value: id,
      label: name,
      children: board
        .filter(({ list }) => list.length)
        .map(({ id, name, list }) => ({
          value: id,
          label: name,
          children: list.map(({ id, name, card }) => ({
            value: id,
            label: name,
            children: [
              ...card.map((_, index, array) => ({
                value: nextPosition(array, index),
                label: index,
              })),
              {
                value: nextPosition(card, card.length),
                label: card.length,
              },
            ],
          })),
        })),
    }));

  return (
    <Popover
      placement="bottom"
      trigger="click"
      open={componentState.isPopoverOpen}
      onOpenChange={(visible) => {
        setComponentState({
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
        <Spin spinning={componentState.isLoading}>
          <Form
            layout="vertical"
            form={form}
            onFinish={({ name, cascader: [, boardId, listId, position] }) => {
              if (!cardData) {
                return;
              }
              setComponentState((state) => ({
                ...state,
                isLoading: true,
              }));

              postCloneCardApi({
                name,
                boardId,
                listId,
                sourceCardId: cardData.id,
                position: `${position}`,
              })
                .then(() => {
                  // 異步執行
                  getOrganizationsAction()(dispatch);
                })
                .finally(() => {
                  setComponentState({
                    isPopoverOpen: false,
                    isLoading: false,
                  });
                });
            }}
          >
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
              <Cascader options={options} placement={"bottomRight"} />
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
