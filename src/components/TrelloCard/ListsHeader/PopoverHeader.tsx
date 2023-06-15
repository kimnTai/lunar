import React from "react";
import { Button } from "antd";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { useListsContext } from "@/context/ListsContext";
import { PopoverHeaderStyled } from "./style";

const PopoverHeader: React.FC = () => {
  const { popoverState, setPopoverState } = useListsContext();

  const titleText = {
    NONE: "",
    ACTION: "列表動作",
    CLOSED: "封存此列表上的所有卡片？",
  }[popoverState];

  return (
    <PopoverHeaderStyled>
      <span className="title">{titleText}</span>
      <Button
        icon={<CloseOutlined />}
        type="text"
        className="popoverCloseIcon"
        onClick={() => setPopoverState("NONE")}
      />
      {popoverState !== "ACTION" && (
        <Button
          type="text"
          style={{ position: "absolute", left: -2, top: 5 }}
          icon={<LeftOutlined />}
          onClick={() => setPopoverState("ACTION")}
        />
      )}
    </PopoverHeaderStyled>
  );
};

export default PopoverHeader;
