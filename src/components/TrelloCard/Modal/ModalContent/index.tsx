import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import CardDescription from "./CardDescription";
import CardMember from "./CardMember";

const ModalContent: React.FC = () => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <CardMember />
      <CardDescription />
    </ModalContentStyled>
  );
};

export default ModalContent;
