import { LabelsProps } from "@/interfaces/labels";
import React from "react";
import { CardInnerLabelStyled, CardInnerLabelsStyled } from "./style";

const CardInnerLabel: React.FC<{ label: LabelsProps[] }> = ({ label }) => {
  return (
    <CardInnerLabelsStyled>
      {label.map(({ _id, color }) => (
        <CardInnerLabelStyled key={_id} color={color} />
      ))}
    </CardInnerLabelsStyled>
  );
};

export default CardInnerLabel;
