import React, { useState } from "react";
import { Divider, Menu, MenuProps } from "antd";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch } from "@/hooks";
import { closeListAction } from "@/redux/listSlice";
import { PopoverContentStyled } from "./style";

const PopoverContent: React.FC<{
  listId: string;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ listId, setOpenPopover }) => {
  const dispatch = useAppDispatch();
  const { setShowAddCard } = useListsContext();
  const [current, setCurrent] = useState("");
  const handleClick: MenuProps["onClick"] = (element) => {
    setCurrent(element.key);

    if (element.key === "newCard") {
      setShowAddCard(true);
      setOpenPopover(false);
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
        onClick={async () => {
          try {
            await dispatch(closeListAction(listId));
          } catch (error) {}
          close();
        }}
        items={[{ key: "keepList", label: "封存這個列表" }]}
      />
    </PopoverContentStyled>
  );
};

export default PopoverContent;
