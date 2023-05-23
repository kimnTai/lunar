import React, { useState } from "react";
import {
  EllipsisOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  TrelloCardHeaderStyled,
  PopoverHeaderStyled,
  PopoverContentStyled,
} from "./style";
import { TrelloCardHeaderProps } from "@/interfaces/trelloCard";
import { Button, Popover, Divider, Menu, MenuProps } from "antd";

const PopoverHeader: React.FC<{ close: Function }> = ({ close }) => {
  return (
    <PopoverHeaderStyled>
      <span className="title">列表動作</span>
      <Button
        icon={<CloseOutlined />}
        type="text"
        className="popoverCloseIcon"
        onClick={() => close()}
      />
    </PopoverHeaderStyled>
  );
};

const PopoverContent: React.FC<{
  close: Function;
  setShowAddCard: Function;
}> = ({ setShowAddCard, close }) => {
  const [current, setCurrent] = useState("");
  const handleClick: MenuProps["onClick"] = (element) => {
    setCurrent(element.key);

    if (element.key === "newCard") {
      setShowAddCard(true);
      close();
    }
  };

  return (
    <PopoverContentStyled>
      <Menu
        className="popoverList"
        selectedKeys={[current]}
        onClick={handleClick}
        items={[
          { key: "newCard", label: "新增卡片" },
          { key: "copyCard", label: "複製列表" },
          { key: "moveCard", label: "移動列表" },
        ]}
      />
      <Divider style={{ margin: "8px 0" }} />
      <Menu
        className="popoverList"
        selectedKeys={[current]}
        onClick={handleClick}
        items={[
          { key: "moveCards", label: "移動這個列表裡的所有卡片" },
          { key: "keepCards", label: "封存這個列表裡的所有卡片" },
        ]}
      />
      <Divider style={{ margin: "8px 0" }} />
      <Menu
        className="popoverList"
        selectedKeys={[current]}
        onClick={handleClick}
        items={[{ key: "keepList", label: "封存這個列表" }]}
      />
    </PopoverContentStyled>
  );
};

const TrelloCardHeader: React.FC<TrelloCardHeaderProps> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);
  const closePopover = () => setOpenPopover(false);
  const handleOpenChange = (ele: boolean) => setOpenPopover(ele);

  return (
    <TrelloCardHeaderStyled>
      <div
        className="d-flex"
        style={{
          fontSize: "16px",
          lineHeight: "150%",
          fontWeight: 700,
        }}
      >
        {props.title}
      </div>
      <div className="d-flex">
        <Button
          type="text"
          icon={<PlusOutlined style={{ color: "white" }} />}
          className="button-hover"
          title="新增卡片"
          onClick={() => props.setShowAddCard(true)}
        ></Button>
        <Popover
          placement="bottomLeft"
          content={
            <PopoverContent
              setShowAddCard={props.setShowAddCard}
              close={closePopover}
            />
          }
          title={<PopoverHeader close={closePopover} />}
          trigger="click"
          open={openPopover}
          arrow={false}
          onOpenChange={handleOpenChange}
          overlayStyle={{ width: "280px" }}
        >
          <Button
            icon={<EllipsisOutlined style={{ color: "white" }} />}
            type="text"
            className="button-hover"
          />
        </Popover>
      </div>
    </TrelloCardHeaderStyled>
  );
};

export default TrelloCardHeader;
