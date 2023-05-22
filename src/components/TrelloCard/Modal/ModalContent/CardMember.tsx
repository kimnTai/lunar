import React from "react";
import { Avatar, Button, Col, Tooltip } from "antd";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";
import { PlusOutlined } from "@ant-design/icons";

const CardMember: React.FC = () => {
  const { cardData } = useCardModalContext();

  const memberAvatarGroup = cardData?.member.map(
    ({ userId: { _id, name, avatar } }) => (
      <Tooltip key={_id} title={name} placement="top">
        <Avatar src={avatar} />
      </Tooltip>
    )
  );

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>成員</h3>
        </Col>
      </SectionHeaderStyled>
      <Avatar.Group>
        {memberAvatarGroup}
        <Button shape="circle" icon={<PlusOutlined />} />
      </Avatar.Group>
    </>
  );
};

export default CardMember;
