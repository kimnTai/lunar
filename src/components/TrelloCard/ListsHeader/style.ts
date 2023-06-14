import styled from "styled-components";

export const TrelloCardHeaderStyled = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  .button-hover:hover {
    background-color: var(--black);
  }
`;

export const PopoverHeaderStyled = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  justify-content: center;
  .title {
    line-height: 41px;
  }
  .popoverCloseIcon {
    position: absolute;
    top: 5px;
    right: 0px;
  }
  border-bottom: 1px solid var(--divider-gray);
`;
