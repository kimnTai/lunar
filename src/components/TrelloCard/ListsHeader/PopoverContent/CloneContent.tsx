import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { cloneListAction, selectListById } from "@/redux/listSlice";
import { nextPosition } from "@/utils/cardFunc";

const CloneContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const list = useAppSelector(selectListById(listId));
  const { setPopoverState } = useListsContext();
  const [spinning, setSpinning] = useState(false);

  const onFinish = async ({ name }: { name: string }) => {
    if (!list) {
      return;
    }
    setSpinning(true);

    const position = (() => {
      const items = board.list
        .map(({ _id, position }) => ({ _id, position }))
        .sort((a, b) => +a.position - +b.position);

      const index = 1 + items.findIndex(({ _id }) => _id === list._id);

      return `${nextPosition(items, index)}`;
    })();

    try {
      await dispatch(
        cloneListAction({
          sourceListId: list._id,
          name: name,
          position: position,
        })
      );
    } catch (error) {}

    setSpinning(false);
    setPopoverState("NONE");
  };

  return (
    <Spin spinning={spinning}>
      <Form
        layout="vertical"
        initialValues={{ name: list?.name }}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="名子">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            建立列表
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CloneContent;
