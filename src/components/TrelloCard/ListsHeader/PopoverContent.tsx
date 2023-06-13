import React, { useState } from "react";
import { Divider, Menu, MenuProps, Spin } from "antd";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch } from "@/hooks";
import { closeListAction } from "@/redux/listSlice";

const PopoverContent: React.FC<{
  listId: string;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ listId, setOpenPopover }) => {
  const dispatch = useAppDispatch();
  const { setShowAddCard } = useListsContext();
  const [current, setCurrent] = useState("");
  const [spinning, setSpinning] = useState(false);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    setCurrent(key);

    if (key === "newCard") {
      setShowAddCard(true);
      setOpenPopover(false);
    }
  };

  return (
    <Spin spinning={spinning}>
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
          setSpinning(true);
          try {
            await dispatch(closeListAction(listId));
          } catch (error) {}
          setSpinning(false);
          setOpenPopover(false);
        }}
        items={[{ key: "keepList", label: "封存這個列表" }]}
      />
    </Spin>
  );
};

export default PopoverContent;
