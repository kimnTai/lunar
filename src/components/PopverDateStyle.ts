import styled from "styled-components";
import { Calendar } from "antd";
interface PopoverDateStyledProps {
  position: {
    top: number;
    left?: number;
    right?: number;
  };
}

export const PopoverDateStyled = styled.div<PopoverDateStyledProps>`
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: ${(props) => props.position.top}px;
  left: ${(props) =>
    props?.position?.left ? `${props.position.left}px` : "auto"};
  right: ${(props) =>
    props?.position?.right ? `${props.position.right}px` : "auto"};
  z-index: 1010;
`;

export const PopoverSectionTitleStyled = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 8px;
`;

export const CardDateStyled = styled.div`
  .cardDate {
    background-color: #e9e9e9;
    padding: 4px 8px;
  }
`;

export const AntCalendarStyled = styled(Calendar)`
  border: 1px solid #e9e9e9;
  margin-bottom: 24px;

  .ant-picker-calendar-mode-switch {
    display: none;
    margin-bottom: 16px;
  }

  .range-marker {
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background-color: #d6f3ff8c;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

export const DateSelectorStyled = styled.div`
  .dayPickerForm {
    display: flex;
    margin-bottom: 16px;
  }

  .dateDisplay {
    background-color: #e9e9e9;
    padding: 4px 8px;
    opacity: 0.5;
  }

  .isShow {
    display: block;
  }

  .isHidden {
    display: none;
  }
`;
