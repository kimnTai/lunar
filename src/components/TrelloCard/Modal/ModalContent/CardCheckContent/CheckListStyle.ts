import styled from "styled-components";
import { Row } from "antd";

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

  .underline {
    text-decoration: underline;
  }
`;

export const CheckItemStyled = styled(Row)`
  .deleteIcon {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
`;
