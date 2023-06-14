import styled from "styled-components";

export const CardInnerChecklistStyled = styled.div`
  display: flex;
  padding: 0 12px;
  margin-top: 8px;
  .checkList {
    display: flex;
    width: 235px;
    overflow: hidden;
  }
  .items {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 5px;
  }
`;

export const CardInnerDateStyled = styled.div<{
  dueComplete: string;
  isDue: string;
}>`
  display: flex;
  padding: 0 12px;
  margin-top: 6px;
  background-color: ${({ dueComplete, isDue }) =>
    dueComplete === "true"
      ? "#1f845a"
      : isDue === "true"
      ? "#ffedeb"
      : undefined};
  color: ${({ dueComplete, isDue }) =>
    dueComplete === "true"
      ? "#ffffff"
      : isDue === "true"
      ? "#ae2a19"
      : undefined};
  .showDate {
    margin-left: 8px;
    letter-spacing: 2px;
  }
`;

export const CardInnerIconStyled = styled.div`
  display: flex;
  justify-content: space-around;
  width: 160px;
  padding: 0 8px;
  margin-top: 6px;
  .mgleft5 {
    margin-left: 5px;
  }
`;
export const TotalCheckItemStyled = styled.div<{
  color: string;
  backgroundColor: string;
}>`
  display: flex;
  padding: 0px 4px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;

export const CardInnerLabelsStyled = styled.div`
  display: flex;
  margin-left: 7px;
  margin-top: 5px;
`;

export const CardInnerLabelStyled = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 24px;
  height: 8px;
  border-radius: 3px;
  margin-left: 5px;
`;
