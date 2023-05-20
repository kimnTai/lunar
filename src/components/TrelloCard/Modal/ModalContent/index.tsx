import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import CardDescription from "./CardDescription";
import CardMember from "./CardMember";
import CardComment from "./CardComment";

const ModalContent: React.FC = () => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <CardMember />
      <CardDescription />
      <CardComment />
    </ModalContentStyled>
  );
};

export default ModalContent;
