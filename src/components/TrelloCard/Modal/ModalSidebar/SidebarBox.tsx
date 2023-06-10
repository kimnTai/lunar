import React from "react";
import { Button } from "antd";

export const SidebarBox: React.FC<{
  title: string;
  className?: string;
  data: {
    label: string;
    value: string;
    icon: any;
    onClickEvent?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
  }[];
}> = ({ title, data, className }) => {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <div className="action-list">
        {data.map((ele, idx) => (
          <Button
            block
            key={idx}
            className="button-link"
            onClick={ele.onClickEvent}
          >
            <span style={{ marginRight: "6px" }}>{ele.icon}</span>
            <span>{ele.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
