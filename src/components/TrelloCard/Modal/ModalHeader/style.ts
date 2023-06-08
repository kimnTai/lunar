import styled from "styled-components";

export const ModalHeaderStyled = styled.div`
  padding: 0;
  margin: 0 0 16px;

  .coverImg {
    width: 100%;
    height: 160px;
    border-radius: 0;
    overflow: hidden;
  }
`;

export const CardHeaderToolbarStyled = styled.div`
  border-bottom: 1px solid #d4d4d4;
  padding: 20px 20px 12px;
  margin-bottom: 8px;

  .col {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    color: #0083ff;
    font-size: 16px;
  }

  p {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    cursor: pointer;
  }
`;

export const CardTitleStyled = styled.div`
  padding: 0 20px 0;

  .titleInput {
    width: 100%;
  }

  .titleTxt,
  .titleInput {
    font-size: 24px;
    font-weight: 600;
    line-height: 120%;
  }
`;
