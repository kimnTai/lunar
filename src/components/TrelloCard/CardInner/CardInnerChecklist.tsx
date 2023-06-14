import { ChecklistProps } from "@/interfaces/checklists";
import { CheckSquareOutlined } from "@ant-design/icons";
import React from "react";
import { CardInnerChecklistStyled } from "./style";

const CardInnerChecklist: React.FC<{ checklist: ChecklistProps[] }> = ({
  checklist,
}) => {
  return (
    <>
      {checklist.length > 0 && (
        <CardInnerChecklistStyled>
          <div>
            <CheckSquareOutlined />
          </div>
          <div className="checkList">
            {checklist.map(({ name, _id }) => (
              <p key={_id} className="items">
                {`${name}、`}
              </p>
            ))}
          </div>
        </CardInnerChecklistStyled>
      )}
    </>
  );
};

export default CardInnerChecklist;
