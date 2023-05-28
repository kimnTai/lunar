import { Button, Form, Input } from "antd";
import { useAppSelector } from "@/hooks/useAppSelector";
import { SendOutlined } from "@ant-design/icons";
import { useCardModalContext } from "@/context/CardModalContext";
import { getCardApi, newCardCommentApi } from "@/api/cards";
import { useState } from "react";
import { CardCommentFormStyled } from "./style";

const CardCommentForm: React.FC = () => {
  const { cardData, setCardData } = useCardModalContext();
  const user = useAppSelector((state) => state.user.user);

  const [form] = Form.useForm<{ comment: string }>();
  const [loading, setLoading] = useState(false);

  return (
    <CardCommentFormStyled>
      <Form
        form={form}
        onFinish={({ comment }) => {
          if (!cardData) {
            return;
          }
          if (!comment) {
            return;
          }

          setLoading(true);

          newCardCommentApi({
            cardId: cardData._id,
            comment,
          })
            .then(() => getCardApi(cardData._id))
            .then(({ result }) => setCardData(result))
            .finally(() => {
              setLoading(false);
              form.resetFields();
            });
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
