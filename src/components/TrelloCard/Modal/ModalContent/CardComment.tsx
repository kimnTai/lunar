import React from "react";
import { Avatar, Col, List } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";

const CardComment: React.FC = () => {
  const { cardData } = useCardModalContext();

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

      <List
        itemLayout="horizontal"
        dataSource={cardData?.comment}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.userId.avatar} />}
              title={`${item.userId.name} --- ${getTimeText(item.updatedAt)}`}
              description={item.comment}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CardComment;
