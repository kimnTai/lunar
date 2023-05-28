import React from "react";

const CardInnerTitle: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div
      style={{
        width: "256px",
        height: "21px",
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "150%",
        padding: "0 12px",
      }}
    >
      {name}
    </div>
  );
};

export default CardInnerTitle;
