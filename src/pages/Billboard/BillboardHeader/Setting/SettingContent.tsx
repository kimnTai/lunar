import { useState } from "react";
import { Button } from "antd";
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { selectOrganization } from "@/redux/organizationSlice";
import EditPeople from "./EditPeople";
import EditWorkSpace from "./EditWorkSpace";
import { SettingContentStyle } from "./style";

const SettingContent: React.FC = () => {
  const [state, setState] = useState<"NONE" | "WORKSPACE" | "PEOPLE">("NONE");
  const [people, setPeople] = useState("成員");

  const board = useAppSelector(selectBoard);
  const userOrganization = useAppSelector(selectOrganization);
  const orgName = userOrganization.find(
    ({ _id }) => _id === board?.organizationId
  )?.name;

  const ChangeWorkSpaceClick = () => {
    setState("WORKSPACE");
  };

  const CommentPurviewClick = () => {
    setState("PEOPLE");
  };

  return (
    <SettingContentStyle>
      <div className="top-border">
        <Button
          type="text"
          onClick={ChangeWorkSpaceClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          變更工作區...
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            {orgName}
          </p>
        </Button>
      </div>
      <div className="top-border" style={{ display: "none" }}>
        <Button
          type="text"
          onClick={CommentPurviewClick}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0 12px",
            height: "64px",
            lineHeight: "32px",
          }}
        >
          評論權限...
          <p
            style={{
              fontSize: "12px",
              marginTop: "-10px",
              marginLeft: "2px",
              color: "gray",
            }}
          >
            {people}
          </p>
        </Button>
      </div>
      {state === "WORKSPACE" && <EditWorkSpace setState={setState} />}
      {state === "PEOPLE" && (
        <EditPeople setState={setState} setPeople={setPeople} />
      )}
    </SettingContentStyle>
  );
};

export default SettingContent;
