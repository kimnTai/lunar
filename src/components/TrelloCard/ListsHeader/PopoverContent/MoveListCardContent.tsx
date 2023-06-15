import React, { useState } from "react";
import { Menu, Spin } from "antd";
import { cloneDeep } from "lodash";
import { useListsContext } from "@/context/ListsContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard } from "@/redux/boardSlice";
import { moveCardAction } from "@/redux/cardSlice";
import { nextPosition } from "@/utils/cardFunc";

const MoveListCardContent: React.FC<{
  listId: string;
}> = ({ listId }) => {
  const dispatch = useAppDispatch();
  const { setPopoverState } = useListsContext();
  const board = useAppSelector(selectBoard);
  const [spinning, setSpinning] = useState(false);

  const onClick = async (key: string) => {
    const [current, target] = [listId, key].map((_key) => {
      return cloneDeep(board.list.find(({ _id }) => _id === _key)?.card);
    });

    if (!current || !target) {
      return;
    }
    setSpinning(true);

    const allAction = current.map((card) => {
      card.position = `${nextPosition(target)}`;
      target.push(card);

      return dispatch(
        moveCardAction({
          cardId: card._id,
          position: card.position,
          listId: key,
        })
      );
    });

    try {
      await Promise.all(allAction);
    } catch (error) {}

    setSpinning(false);
    setPopoverState("NONE");
  };

  return (
    <Spin spinning={spinning}>
      <Menu
        className="popoverList"
        selectedKeys={[]}
        items={board.list.map(({ _id, name }) => ({
          key: _id,
          label: (
            <>
              {name}
              {_id === listId && " (目前版本)"}
            </>
          ),
          disabled: _id === listId,
        }))}
        onClick={({ key }) => onClick(key)}
      />
    </Spin>
  );
};

export default MoveListCardContent;
