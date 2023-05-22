import React from "react";
import { Avatar, Button, Col } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";
import { PlusOutlined } from "@ant-design/icons";

const CardLabel: React.FC = () => {
  const { cardData } = useCardModalContext();

  const labelAvatarGroup = cardData?.label.map(({ name, color, _id }) => (
    <Avatar key={_id} shape="square" style={{ backgroundColor: color }}>
      {name}
    </Avatar>
  ));

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>標籤</h3>
        </Col>
      </SectionHeaderStyled>
      <Avatar.Group>
        {labelAvatarGroup}
        <Button shape="circle" icon={<PlusOutlined />} />
      </Avatar.Group>
    </>
  );
};

export default CardLabel;
