import React, { useState } from "react";
import { Button, Input, Popover, Spin } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectListById, updateListAction } from "@/redux/listSlice";
import PopoverContent from "./PopoverContent";
import PopoverHeader from "./PopoverHeader";
import { TrelloCardHeaderStyled } from "./style";

const ListsHeader: React.FC<{ listId: string }> = ({ listId }) => {
  const dispatch = useAppDispatch();
  const { setShowAddCard, popoverState, setPopoverState } = useListsContext();
  const list = useAppSelector(selectListById(listId));

  const [edit, setEdit] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const onCancel = async (e: any) => {
    const value = e.target.value;
    if (list && list?.name !== value && value?.length >= 2) {
      setSpinning(true);
      await dispatch(
        updateListAction({
          listId: list._id,
          name: value,
        })
      );
    }
    setSpinning(false);
    setEdit(false);
  };

  return (
    <TrelloCardHeaderStyled>
      {edit ? (
        <Spin spinning={spinning}>
          <Input
            ref={(input) => {
              if (input) {
                input.focus();
                setEdit(true);
              }
            }}
            placeholder="請輸入標題"
            defaultValue={list?.name}
            onBlur={onCancel}
            onPressEnter={onCancel}
          />
        </Spin>
      ) : (
        <p
          style={{
            fontSize: "16px",
            lineHeight: "150%",
            fontWeight: 700,
          }}
          onClick={() => setEdit(true)}
        >
          {list?.name}
        </p>
      )}
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
          content={<PopoverContent listId={listId} />}
          title={<PopoverHeader />}
          trigger="click"
          open={popoverState !== "NONE"}
          arrow={false}
          onOpenChange={(visible) => {
            setPopoverState(visible ? "ACTION" : "NONE");
          }}
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
