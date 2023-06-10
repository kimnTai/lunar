import React from "react";
import { Avatar, Col, List } from "antd";
import { useParamCard } from "@/hooks/useParamCard";
import CardCommentForm from "./CardCommentForm";
import { CardCommentListStyled, SectionHeaderStyled } from "./style";

const CardComment: React.FC = () => {
  const cardData = useParamCard();

  const getTimeText = (time: string) => {
    const seconds = (Date.now() - new Date(time).getTime()) / 1000;
    const [days, hours, minutes] = [
      seconds / 60 / 60 / 24,
      (seconds / 60 / 60) % 24,
      (seconds / 60) % 60,
    ].map((item) => `${~~item}`);

    return `${days} 天 ${hours} 時 ${minutes} 分 前`;
  };

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>評論</h3>
        </Col>
      </SectionHeaderStyled>
      <CardCommentListStyled>
        <List
          itemLayout="horizontal"
          dataSource={cardData?.comment}
          locale={{ emptyText: " " }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.userId.avatar} />}
                title={`${item.userId.name}`}
                description={getTimeText(item.updatedAt)}
              />
              <p className="ant-list-item-comment">{item.comment}</p>
            </List.Item>
          )}
        />
      </CardCommentListStyled>
      <CardCommentForm />
    </>
  );
};

export default CardComment;
