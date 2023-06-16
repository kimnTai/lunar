import { Button, Input } from "antd";
import styled from "styled-components";

export const LabelContentStyle = styled.div`
  .createLabelView {
    position: absolute;
    width: 250px;
    background: #ffffff;
    box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.16);
    right: -15px;
    top: 19px;
    border-radius: 8px;
  }

  .label {
    font-size: 14px;
    line-height: 16px;
    margin-top: 12px;
  }
  .top-border {
    margin-top: 10px;
  }
  .hoverBtn {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    left: 0;
    top: 0;
  }
`;

export const LableActionFormStyled = styled.div<{ labelColor: string }>`
  position: relative;
  width: 100%;
  height: 101px;
  background-color: var(--ds-surface-sunken, #f4f5f7);

  div {
    position: absolute;
    width: 80%;
    height: 40%;
    background-color: ${({ labelColor }) => labelColor};
    left: 10%;
    top: 30%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    border-radius: 4px;
  }
`;

export const ColorBlockButtonStyled = styled(Button)<{ color: string }>`
  color: white;
  background-color: ${({ color }) => color};
  border: 1px solid white;
  border-radius: 4px;
  width: 31%;
  height: 36px;
  margin-top: 8px;
  margin-right: 5.2px;
`;

export const LabelInputStyled = styled(Input)`
  width: 100%;
  height: 32px;
  border-radius: 4px;
  margin-top: 8px;
`;

export const LabelBtnStyled = styled(Button)<{
  color: string;
  backgroundColor: string;
}>`
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid white;
  border-radius: 4px;
  width: 100%;
  height: 34px;
  padding: 0 12px;
  margin-top: 10px;
`;

export const LabelEditBtnStyled = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  margin-top: 10px;
  color: var(--gray66);
  z-index: 0;
`;

export const LabelColorClearBtnStyled = styled(Button)`
  font-weight: bold;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  width: 100%;
  height: 38px;
  margin-top: -15px;
  background-color: #d4d4d4;
  &:hover {
    background-color: #bebebe;
  }
`;

export const LabelActionSubmitBtnStyled = styled(Button)<{ width: string }>`
  width: ${({ width }) => width};
  height: 32px;
  margin-top: 5px;
  border-radius: 4px;
`;
