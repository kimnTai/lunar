import styled from "styled-components";
import { Button } from "antd";

export const BillboardHeaderCss = styled.div`
  margin-bottom: 16px;
  .right-head {
    display: flex;
    column-gap: 16px;
  }
`;

export const BillboardHeaderBtn = styled(Button)`
  color: white;
  background-color: var(--black23);
  padding: 8px;
  display: flex;
  align-items: center;
  height: 36px;
`;

export const PopoverTitleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PopoverContentStyle = styled.div`
  .top-border {
    border-top: 1px solid var(--grayd5);
    padding: 8px 0;
  }
  .listBtn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hoverBtn:hover {
    background-color: black;
    opacity: 0.3;
  }
`;

export const BoardTitleStyle = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;

  input {
    font-size: 24px;
    font-weight: 700;
  }

  p {
    transition: background-color 0.3s;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px;

    &:hover {
      background-color: var(--gray66);
    }
  }
`;
