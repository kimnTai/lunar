import React from "react";
import styled from "styled-components";

interface ColorIconProps {
  size: string;
  color?: string;
  text?: string;
  fontSize?: string;
  background?: string;
  "background-image"?: string;
}

const DEFAULT_BACKGROUND = `linear-gradient(
  112.89deg,
  #0083ff 1.48%,
  rgba(128, 0, 255, 0.86) 100%
)`;

const ColorIconCss = styled.div<ColorIconProps>`
  background: ${(props) => props.background ?? DEFAULT_BACKGROUND};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: ${(props) => props.color}!important;
  font-size: ${(props) => props.fontSize};
  border-radius: 8px;
  justify-content: center;
  border: 1px solid #a0d7ff;
  background-image: ${(props) => props["background-image"]};
  background-size: 24px 24px;
  display: flex;
`;

const ColorIcon: React.FC<ColorIconProps> = (props) => (
  <ColorIconCss className="d-center" {...props}>
    {props.text}
  </ColorIconCss>
);

export default ColorIcon;
