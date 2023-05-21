import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const ListButtonStyled = styled(Button)`
  width: 100%;
  span:last-child {
    margin: 0;
  }
  display: flex;
  align-items: center;
`;

export const ListButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  danger?: boolean;
  // onClick?: ;
}> = ({ icon, text, danger, onClick }) => {
  return (
    <ListButtonStyled
      type="text"
      icon={icon}
      style={{ padding: 0 }}
      danger={danger}
      // onClick={onClick}
    >
      {text}
    </ListButtonStyled>
  );
};
