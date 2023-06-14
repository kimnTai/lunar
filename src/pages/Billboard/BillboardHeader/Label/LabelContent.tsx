import { useState } from "react";
import { Button } from "antd";
import CreateLabel from "./CreateLabel";
import EditLabel from "./EditLabel";
import LabelSpace from "./LabelSpace";
import { LabelContentStyle } from "./style";

const LabelContent: React.FC = () => {
  const [state, setState] = useState<"NONE" | "CREATE" | "EDIT">("NONE");
  const [labelId, setLabelId] = useState("");

  const openEdit = (labelId: string) => {
    setState("EDIT");
    setLabelId(labelId);
  };

  return (
    <LabelContentStyle className="top-border">
      <LabelSpace openEdit={openEdit} />
      <Button
        type="primary"
        style={{
          width: "100%",
          height: "32px",
          marginTop: "13px",
          borderRadius: "4px",
          marginBottom: "-5px",
        }}
        onClick={() => setState("CREATE")}
      >
        建立新標籤
      </Button>
      {state === "CREATE" && <CreateLabel setState={setState} />}
      {state === "EDIT" && <EditLabel labelId={labelId} setState={setState} />}
    </LabelContentStyle>
  );
};

export default LabelContent;
