import React from "react";
import { ModalStyle, ModalContentStyled } from "./style";
import { CardsProps } from "@/interfaces/cards";
import CardDescription from "./CardDescription";

const ModalContent: React.FC<{ cardData: CardsProps }> = ({ cardData }) => {
  return (
    <ModalContentStyled style={ModalStyle}>
      <CardDescription cardData={cardData} />
    </ModalContentStyled>
  );
};

export default ModalContent;
