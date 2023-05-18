import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import CardDescription from "./CardDescription";

const ModalContent: React.FC = () => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <CardDescription />
    </ModalContentStyled>
  );
};

export default ModalContent;
