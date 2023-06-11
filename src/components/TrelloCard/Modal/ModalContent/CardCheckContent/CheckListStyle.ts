import styled from "styled-components";
import { Row } from "antd";

export const CheckListStyled = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;

  .listTitle {
    margin-bottom: 8px;
  }

  .isShow {
    display: flex;
  }

  .isHidden {
    display: none;
  }

  .ant-col {
    margin-bottom: 1px dashed #9f9f9f;
  }

  .addCheckItem {
    color: #9f9f9f;
    cursor: pointer;
    padding: 8px 0;
  }

  .addCheckItemTextArea {
    margin-bottom: 8px;
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
  min-height: 32px;
  border-bottom: 1px dashed #9f9f9f;
  padding: 5px 8px;

  .checkbox {
    margin-right: 8px;
  }

  .checkboxLoading {
    margin-right: 10px;
  }

  .itemName {
    cursor: pointer;
  }

  .checkbox .ant-checkbox-inner {
    background-color: #ffffff;
    border-color: #ffffff;
  }

  /* Checkbox 選中狀態 */
  .checkbox .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9f9f9f;
    border-color: #9f9f9f;
  }

  .deleteIcon {
    course: pointer;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    .ant-btn {
      height: auto;
      padding: 0;
    }
  }

  .lineThrough {
    text-decoration: line-through;
  }
`;
