import { ChecklistProps } from "@/interfaces/checklists";
import { CheckSquareOutlined } from "@ant-design/icons";
import React from "react";

const CardInnerChecklist: React.FC<{ checklist: ChecklistProps[] }> = ({
  checklist,
}) => {
  return (
    <>
      {checklist.length > 0 && (
        <div
          style={{
            display: "flex",
            padding: "0 12px",
            marginTop: "8px",
          }}
        >
          <div>
            <CheckSquareOutlined />
          </div>
          <div
            style={{
              display: "flex",
              width: "235px",
              overflow: "hidden",
            }}
          >
            {checklist.map(({ name, _id }) => (
              <p
                key={_id}
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginLeft: "5px",
                }}
              >
                {`${name}、`}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CardInnerChecklist;
