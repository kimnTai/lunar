import { useEffect, useRef, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputRef, Space } from "antd";
import CreateLabel from "./CreateLabel";
import EditLabel from "./EditLabel";
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";

const LabelContent: React.FC = () => {
  const [form] = Form.useForm();

  const [state, setState] = useState<"NONE" | "CREATE" | "EDIT">("NONE");

  const [inputColor, setInputColor] = useState("#ffb6c1");
  const [inputName, setInputName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [labelID, setLabelID] = useState("");
  const labelList = useAppSelector(selectBoard).label;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      const found = labelList.filter((item) =>
        item.name.includes(e.target.value)
      );
      if (found.length > 0) {
      } else if (found.length === 0) {
      }
    } else if (e.target.value === "") {
    }
  };

  const checkColorHandler = (color: any) => {
    setInputColor(color);
  };

  const clearColorHandler = () => {
    if (inputColor !== "#DFE1E6") {
      setInputColor("#DFE1E6");
    }
  };

  const editLabelHandler = (name: any, color: any, id: any) => {
    setState("EDIT");
    setInputName(name);
    setInputColor(color);
    setLabelID(id);
    form.setFieldsValue({ editLabelName: name });
  };

  useEffect(() => {
    if (state === "EDIT") {
      inputRef.current!.focus();
    }
  }, [state]);

  return (
    <div className="top-border">
      <Input
        allowClear
        placeholder="搜尋標籤..."
        onChange={handleInputChange}
      />
      <Space style={{ display: "flex" }}>
        <Space.Compact direction="vertical" style={{ width: 200 }}>
          {labelList?.map((ele, idx) => (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={idx}
            >
              <Button
                className="labelBtn"
                type="primary"
                style={{
                  color: "white",
                  backgroundColor: ele.color,
                  border: "1px solid white",
                  borderRadius: "4px",
                  width: "100%",
                  height: "34px",
                  padding: "0 12px",
                  marginTop: "10px",
                }}
                key={idx}
              >
                {ele.name}
              </Button>
              <Button
                type="text"
                icon={<EditOutlined />}
                style={{
                  width: "32px",
                  height: "32px",
                  padding: 0,
                  marginTop: "10px",
                  color: "var(--gray66)",
                }}
                onClick={() => editLabelHandler(ele.name, ele.color, ele._id)}
              />
            </div>
          ))}
        </Space.Compact>
      </Space>
      <Button
        className="createLabelBtn"
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
      {state === "CREATE" && (
        <CreateLabel
          {...{
            setState,
            inputColor,
            inputName,
            setInputName,
            checkColorHandler,
            clearColorHandler,
          }}
        />
      )}
      {state === "EDIT" && (
        <EditLabel
          {...{
            labelID,
            setState,
            form,
            inputColor,
            inputName,
            setInputName,
            inputRef,
            checkColorHandler,
            clearColorHandler,
          }}
        />
      )}
    </div>
  );
};

export default LabelContent;
