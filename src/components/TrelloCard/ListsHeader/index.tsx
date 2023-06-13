import React, { useState } from "react";
import { Button, Popover } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useListsContext } from "@/context/ListsContext";
import { useAppSelector } from "@/hooks";
import { selectListById } from "@/redux/listSlice";
import PopoverContent from "./PopoverContent";
import PopoverHeader from "./PopoverHeader";
import { TrelloCardHeaderStyled } from "./style";

const ListsHeader: React.FC<{ listId: string }> = ({ listId }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const { setShowAddCard } = useListsContext();
  const list = useAppSelector(selectListById(listId));

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
        {list?.name}
      </div>
      <div className="d-flex">
        <Button
          className="button-hover"
          type="text"
          icon={<PlusOutlined style={{ color: "white" }} />}
          title="新增卡片"
          onClick={() => setShowAddCard(true)}
        />
        <Popover
          placement="bottomLeft"
          content={
            <PopoverContent listId={listId} setOpenPopover={setOpenPopover} />
          }
          title={<PopoverHeader setOpenPopover={setOpenPopover} />}
          trigger="click"
          open={openPopover}
          arrow={false}
          onOpenChange={(visible) => setOpenPopover(visible)}
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

export default ListsHeader;
