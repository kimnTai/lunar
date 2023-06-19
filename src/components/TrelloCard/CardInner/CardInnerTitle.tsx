import React from "react";

const CardInnerTitle: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div
      style={{
        height: "21px",
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "150%",
        padding: "0 12px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {name}
    </div>
  );
};

export default CardInnerTitle;
