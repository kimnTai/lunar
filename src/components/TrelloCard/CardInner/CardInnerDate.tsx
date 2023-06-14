import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { DateProps } from "@/interfaces/cards";
import { CardInnerDateStyled } from "./style";

const CardInnerDate: React.FC<{ date: DateProps | null }> = ({ date }) => {
  const isDue = Date.now() - new Date(date?.dueDate || "").getTime() > 0;
  const showDate = (date: DateProps) => {
    const startMonth = new Date(date.startDate).getMonth() + 1;
    const dueMonth = new Date(date.dueDate).getMonth() + 1;
    const startDay = new Date(date.startDate).getDate();
    const dueDay = new Date(date.dueDate).getDate();

    if (date.startDate && date.dueDate) {
      return `${startMonth}月${startDay}日-${dueMonth}月${dueDay}日`;
    }

    if (date.startDate) {
      return `${startMonth}月${startDay}日`;
    }

    return `${dueMonth}月${dueDay}日`;
  };
  return (
    date && (
      <CardInnerDateStyled
        dueComplete={date?.dueComplete.toString()}
        isDue={isDue.toString()}
      >
        <div>
          <ClockCircleOutlined />
        </div>
        <div className="showDate">{showDate(date)}</div>
      </CardInnerDateStyled>
    )
  );
};

export default CardInnerDate;
