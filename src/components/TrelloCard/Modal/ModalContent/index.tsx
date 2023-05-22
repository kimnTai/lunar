import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import CardDescription from "./CardDescription";
import CardMember from "./CardMember";
import CardComment from "./CardComment";
import CardLabel from "./CardLabel";
import CardDate from "./CardDate";
import CardAttachment from "./CardAttachment";
import CardCheckContent from "./CardCheckContent";

const ModalContent: React.FC = () => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <CardMember />
      <CardLabel />
      <CardDate />
      <CardAttachment />
      <CardCheckContent />
      <CardDescription />
      <CardComment />
    </ModalContentStyled>
  );
};

export default ModalContent;
