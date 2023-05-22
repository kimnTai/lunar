import React from "react";
import { Checkbox, Col } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useCardModalContext } from "@/context/CardModalContext";
import { SectionHeaderStyled } from "./style";

const CardDate: React.FC = () => {
  const { cardData } = useCardModalContext();

  const getDate = (param: { startDate?: string; dueDate: string }) => {
    return [param.dueDate, param.startDate].reduce((pre, value) => {
      if (!value) {
        return pre;
      }
      const date = new Date(value);
      const str = `${date.getMonth() + 1}月${date.getDate()}日`;

      return `${str}${pre ? " - " : ""}${pre}`;
    }, "");
  };

  const handleChange = (_e: CheckboxChangeEvent) => {};

  return (
    <>
      <SectionHeaderStyled align="middle" gutter={8}>
        <Col flex="none">
          <h3>到期日</h3>
        </Col>
      </SectionHeaderStyled>
      {cardData?.date && (
        <>
          {getDate(cardData.date)}
          <Checkbox checked={cardData.date.dueComplete} onChange={handleChange}>
            已完成
          </Checkbox>
        </>
      )}
    </>
  );
};

export default CardDate;
