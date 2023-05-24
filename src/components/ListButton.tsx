import { Button, ButtonProps } from "antd";
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

const ListButton: React.FC<ButtonProps & { text: string; onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) }> = (props) => {
  return (
    <ListButtonStyled {...props} type="text" style={{ padding: 0 }}>
      {props.text}
    </ListButtonStyled>
  );
};

export default ListButton;
