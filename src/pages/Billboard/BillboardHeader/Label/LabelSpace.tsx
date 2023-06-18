import { EditOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { useState } from "react";
import { isDarkColor } from "@/utils/func";
import { LabelEditBtnStyled, LabelBtnStyled } from "./style";

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
          {labelList.map((label) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              key={label._id}
            >
              <LabelBtnStyled
                color={isDarkColor(label.color) ? "white" : "black"}
                background-color={label.color}
                onClick={() => openEdit(label._id)}
              >
                {label.name}
              </LabelBtnStyled>
              <LabelEditBtnStyled
                type="text"
                icon={<EditOutlined />}
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
