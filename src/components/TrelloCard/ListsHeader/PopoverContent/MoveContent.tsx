import React, { useState } from "react";
import { Button, Form, Spin } from "antd";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { moveListAction, selectListById } from "@/redux/listSlice";
import ListCascader from "./ListCascader";

const MoveContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectListById(listId));
  const { setPopoverState } = useListsContext();
  const [spinning, setSpinning] = useState(false);

  const onFinish = async ({
    cascader: [, boardId, position],
  }: {
    cascader: [string, string, number];
  }) => {
    if (!list) {
      return;
    }
    setSpinning(true);

    try {
      await dispatch(
        moveListAction({
          listId: list._id,
          sourceBoardId: list.boardId,
          boardId: boardId,
          position: `${position}`,
        })
      );
    } catch (error) {}

    setSpinning(false);
    setPopoverState("NONE");
  };

  return (
    <Spin spinning={spinning}>
      <Form layout="vertical" onFinish={onFinish}>
        <ListCascader
          label="移動到..."
          name="cascader"
          rules={[
            {
              required: true,
              message: "請選擇位置!",
            },
          ]}
        />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            移動
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default MoveContent;
