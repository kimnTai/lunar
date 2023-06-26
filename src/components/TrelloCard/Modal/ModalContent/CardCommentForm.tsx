import { useState } from "react";
import { Button, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import AvatarCustom from "@/components/AvatarCustom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useParamCard } from "@/hooks/useParamCard";
import { newCardCommentAction } from "@/redux/cardSlice";
import { selectUser } from "@/redux/userSlice";
import { CardCommentFormStyled } from "./style";

const CardCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardId = useParamCard()?._id;
  const user = useAppSelector(selectUser);

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
            <AvatarCustom
              username={user.name}
              imgUrl={user.avatar}
              size={32}
              style={{
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
