import React from "react";
import styled from "styled-components";

const ColorIcon: React.FC<{
  color: string;
  text: string;
  size: string;
  fontSize: string;
  background: string;
}> = ({ color, text, size, background, fontSize }) => {
  const ColorIconCss = styled.div`
    background-color: ${background};
    width: ${size};
    height: ${size};
    color: ${color};
    font-size: ${fontSize};
    border-radius: 8px;
  `;
  return <ColorIconCss className="d-center">{text}</ColorIconCss>;
};

export default ColorIcon;
