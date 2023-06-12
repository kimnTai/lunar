import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { useState } from "react";
import { isDarkColor } from "@/utils/func";

const LabelSpace: React.FC<{
  openEdit: (labelId: string) => void;
}> = ({ openEdit }) => {
  const board = useAppSelector(selectBoard);
  const [keyword, setKeyWord] = useState("");

  const labelList = board?.label.filter(({ name }) => name.includes(keyword));

  return (
    <>
      <Input
        allowClear
        placeholder="搜尋標籤..."
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}
      />
      <Space style={{ display: "flex" }}>
        <Space.Compact direction="vertical" style={{ width: 200 }}>
          {labelList.map((label, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              <Button
                className="labelBtn"
                type="primary"
                style={{
                  color: isDarkColor(label.color) ? "white" : "black",
                  backgroundColor: label.color,
                  border: "1px solid white",
                  borderRadius: "4px",
                  width: "100%",
                  height: "34px",
                  padding: "0 12px",
                  marginTop: "10px",
                }}
                key={index}
                onClick={() => openEdit(label._id)}
              >
                {label.name}
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
                onClick={() => openEdit(label._id)}
              />
            </div>
          ))}
        </Space.Compact>
      </Space>
    </>
  );
};

export default LabelSpace;
