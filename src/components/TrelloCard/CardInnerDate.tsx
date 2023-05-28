import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { DateProps } from "@/interfaces/cards";

const CardInnerDate: React.FC<{ date: DateProps | null }> = ({ date }) => {
  return (
    date && (
      <div
        style={{
          display: "flex",
          padding: "0 12px",
          marginTop: "6px",
        }}
      >
        <div>
          <ClockCircleOutlined />
        </div>
        {(() => {
          const startMonth = new Date(date.startDate).getMonth() + 1;
          const dueMonth = new Date(date.dueDate).getMonth() + 1;
          const startDay = new Date(date.startDate).getDate();
          const dueDay = new Date(date.dueDate).getDate();

          if (date.startDate && date.dueDate) {
            return (
              <div style={{ marginLeft: "8px", letterSpacing: "2px" }}>
                {startMonth}月{startDay}日-{dueMonth}月{dueDay}日
              </div>
            );
          }

          if (date.startDate) {
            return (
              <div>
                {startMonth}月{startDay}日
              </div>
            );
          }

          return (
            <div>
              {dueMonth}月{dueDay}日
            </div>
          );
        })()}
      </div>
    )
  );
};

export default CardInnerDate;
