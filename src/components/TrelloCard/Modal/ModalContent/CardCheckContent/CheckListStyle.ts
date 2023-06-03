import styled from "styled-components";

export const CheckListStyled = styled.div`
  .isShow {
    display: block;
  }

  .isHidden {
    display: none;
  }
  .ant-row {
    padding: 4px 8px;
  }

  .ant-col {
    margin-bottom: 1px dashed #9f9f9f;
  }

  .addCheckList {
    color: #9f9f9f;
  }
`;

export const CheckItemsStyled = styled.div`
  .isCompletedTitle {
    text-decoration: line-through;
  }
  .isShow {
    display: block;
  }

  .isHidden {
    display: none;
  }
`;

