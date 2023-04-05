import React from "react";
import { ContainerOutlined } from "@ant-design/icons";
import { ModalHeaderStyled } from "./style";

const ModalHeader: React.FC = () => {
  return (
    <ModalHeaderStyled>
      <ContainerOutlined />
      &nbsp; title here
    </ModalHeaderStyled>
  );
};

export default ModalHeader;
