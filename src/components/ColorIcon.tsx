import React from "react";
import styled from "styled-components";

export const ColorIcon: React.FC<{
  color: string;
  text: string;
  size: string;
  background: string;
}> = ({ color, text, size, background }) => {
  const ColorIconCss = styled.div`
    background-color: ${background};
    width: ${size};
    height: ${size};
    color: ${color};
    border-radius: 8px;
  `;
  return <ColorIconCss className="d-center">{text}</ColorIconCss>;
};
