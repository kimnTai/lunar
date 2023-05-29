import React from "react";
import { Button, Card, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useCardModalContext } from "@/context/CardModalContext";
import PopoverDate from "@/components/TrelloCard/Modal/PopoverContent/PopoverDate";
import { PopoverStyled } from "./PopoverSytle";

const Popover: React.FC = () => {
  const { openPopover, handleClosePopover, PopoverType } =
    useCardModalContext();
  const { isShow, type, position = null } = openPopover;

  const renderPopoverContent = () => {
    switch (type) {
      case PopoverType.DATE:
        return <PopoverDate />;
      case PopoverType.CHECKLIST:
        return <div>CHECKLIST</div>;
      default:
        return null;
    }
  };

  const getPopoverTitle = () => {
    switch (type) {
      case PopoverType.DATE:
        return "日期";
      case PopoverType.CHECKLIST:
        return "待辦清單";
      default:
        return "";
    }
  };

  return (
    <>
      {isShow && (
        <PopoverStyled position={position}>
          <Space direction="vertical" size={16}>
            <Card
              title={getPopoverTitle()}
              extra={
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  onClick={handleClosePopover}
                />
              }
              size="small"
              style={{ width: 326 }}
            >
              {renderPopoverContent()}
            </Card>
          </Space>
        </PopoverStyled>
      )}
    </>
  );
};

export default Popover;
