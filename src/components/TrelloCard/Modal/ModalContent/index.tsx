import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import CardDescription from "./CardDescription";
import CardMember from "./CardMember";
import CardComment from "./CardComment";
import CardLabel from "./CardLabel";
import CardDate from "./CardDate";
import CardAttachment from "./CardAttachment";
import CardCheckContent from "./CardCheckContent";
import { Row } from "antd";

const ModalContent: React.FC = () => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <Row
        justify={"space-between"}
        align={"top"}
        style={{ marginBottom: "16px" }}
      >
        <CardMember />
        <CardLabel />
      </Row>
      <CardDate />
      <CardAttachment />
      <CardCheckContent />
      <CardDescription />
      <CardComment />
    </ModalContentStyled>
  );
};

export default ModalContent;
