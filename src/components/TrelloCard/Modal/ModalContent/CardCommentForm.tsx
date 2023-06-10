import { useState } from "react";
import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { newCardCommentAction } from "@/redux/cardSlice";
import { CardCommentFormStyled } from "./style";

const CardCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardId = useParamCard()?._id;
  const user = useAppSelector((state) => state.user.user);

  const [form] = Form.useForm<{ comment: string }>();
  const [loading, setLoading] = useState(false);

  return (
    <CardCommentFormStyled>
      <Form
        form={form}
        onFinish={async ({ comment }) => {
          if (!cardId) {
            return;
          }
          if (!comment) {
            return;
          }

          setLoading(true);

          try {
            await dispatch(
              newCardCommentAction({
                cardId,
                comment,
              })
            );
          } finally {
            setLoading(false);
            form.resetFields();
          }
        }}
      >
        <Form.Item
          name={"comment"}
          label={
            <img
              src={user.avatar}
              style={{
                height: 32,
                width: 32,
                marginRight: "16px",
              }}
            />
          }
        >
          <Input.TextArea placeholder="填寫評論" rows={2} />
        </Form.Item>
        <Button
          icon={<SendOutlined style={{ color: "#0083FF" }} />}
          htmlType="submit"
          type="text"
          loading={loading}
        />
      </Form>
    </CardCommentFormStyled>
  );
};

export default CardCommentForm;
