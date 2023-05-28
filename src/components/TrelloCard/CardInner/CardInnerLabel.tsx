import { LabelsProps } from "@/interfaces/labels";
import React from "react";

const CardInnerLabel: React.FC<{ label: LabelsProps[] }> = ({ label }) => {
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "7px",
        marginTop: "5px",
      }}
    >
      {label.map(({ _id, color }) => (
        <div
          key={_id}
          style={{
            backgroundColor: `${color}`,
            width: "24px",
            height: "8px",
            borderRadius: "3px",
            marginLeft: "5px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default CardInnerLabel;
