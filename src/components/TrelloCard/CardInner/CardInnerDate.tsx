import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { DateProps } from "@/interfaces/cards";

const CardInnerDate: React.FC<{ date: DateProps | null }> = ({ date }) => {
  const isDue = Date.now() - new Date(date?.dueDate || "").getTime() > 0;

  const backgroundColor = (() => {
    if (date?.dueComplete) {
      return "#1f845a";
    }
    if (isDue) {
      return "#ffedeb";
    }
  })();

  const color = (() => {
    if (date?.dueComplete) {
      return "#ffffff";
    }
    if (isDue) {
      return "#ae2a19";
    }
  })();

  return (
    date && (
      <div
        style={{
          display: "flex",
          padding: "0 12px",
          marginTop: "6px",
          color: color,
          backgroundColor: backgroundColor,
        }}
      >
        <div>
          <ClockCircleOutlined />
        </div>
        <div
          style={{
            marginLeft: "8px",
            letterSpacing: "2px",
          }}
        >
          {(() => {
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
          })()}
        </div>
      </div>
    )
  );
};

export default CardInnerDate;
