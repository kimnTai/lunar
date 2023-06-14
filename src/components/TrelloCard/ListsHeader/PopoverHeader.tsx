import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PopoverHeaderStyled } from "./style";

const PopoverHeader: React.FC<{
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpenPopover }) => {
  return (
    <PopoverHeaderStyled>
      <span className="title">列表動作</span>
      <Button
        icon={<CloseOutlined />}
        type="text"
        className="popoverCloseIcon"
        onClick={() => setOpenPopover(false)}
      />
    </PopoverHeaderStyled>
  );
};

export default PopoverHeader;
