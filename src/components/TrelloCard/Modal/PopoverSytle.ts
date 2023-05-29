import styled from "styled-components";
import { PopoverPositionProps } from "@/context/CardModalContext";

interface PopoverDateStyledProps {
  position: PopoverPositionProps | null;
}

export const PopoverStyled = styled.div<PopoverDateStyledProps>`
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: ${(props) => props?.position?.top}px;
  left: ${(props) =>
    props?.position?.left ? `${props.position.left}px` : "auto"};
  right: ${(props) =>
    props?.position?.right ? `${props.position.right}px` : "auto"};
  z-index: 1010;

  .ant-card-head-title {
    text-align: center;
  }

  .ant-card-extra {
    position: absolute;
    right: 0;
  }
`;
