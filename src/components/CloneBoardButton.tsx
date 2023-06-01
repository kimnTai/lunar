import React, { useState } from "react";
import { Button, Form, Input, Popover, Select, Spin } from "antd";
import ListButton from "./ListButton";
import { CopyOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useNavigate, useParams } from "react-router";
import { postCloneBoardApi } from "@/api/boards";
import { selectOrganization } from "@/redux/organizationSlice";

type FormValues = {
  name: string;
  organizationId: string;
};

const CloneBoardButton: React.FC = () => {
  const [componentState, setComponentState] = useState({
    isLoading: false,
    isPopoverOpen: false,
  });
  const [form] = Form.useForm<FormValues>();
  const { boardId } = useParams();
  const organization = useAppSelector(selectOrganization);

  const navigate = useNavigate();

  const onFinish = (value: FormValues) => {
    if (boardId) {
      setComponentState((pre) => ({
        ...pre,
        isLoading: true,
      }));

      postCloneBoardApi({
        ...value,
        sourceBoardId: boardId,
      })
        .then((res) => {
          navigate(`/board/${res.result.id}`);
        })
        .finally(() => {
          setComponentState({
            isPopoverOpen: false,
            isLoading: false,
          });
        });
    }
  };

  return (
    <Popover
      placement="bottom"
      trigger="click"
      open={componentState.isPopoverOpen}
      onOpenChange={(visible) => {
        setComponentState((pre) => ({
          ...pre,
          isPopoverOpen: visible,
        }));
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
          複製看板
        </div>
      }
      content={
        <Spin spinning={componentState.isLoading}>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
              organizationId: organization.find(({ board }) =>
                board.map(({ id }) => id).includes(`${boardId}`)
              )?.id,
            }}
          >
            <Form.Item
              name="name"
              label="看板名稱"
              rules={[
                {
                  required: true,
                  message: "請輸入看板名稱!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="organizationId"
              label="工作區"
              rules={[
                {
                  required: true,
                  message: "請選擇工作區!",
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  form.setFieldsValue({ organizationId: value });
                }}
                options={organization.map(({ _id, name }) => ({
                  value: _id,
                  label: name,
                }))}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                新建
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      }
    >
      <ListButton
        icon={
          <CopyOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
        }
        text="複製看板"
      />
    </Popover>
  );
};

export default CloneBoardButton;
