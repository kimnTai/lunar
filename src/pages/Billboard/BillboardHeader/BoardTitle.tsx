import React, { useState } from "react";
import { ColorIcon } from "@/components/Icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard, updateBoardAction } from "@/redux/boardSlice";
import { Input } from "antd";
import { BoardTitleStyle } from "./style";

const BoardTitle: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const [edit, setEdit] = useState(false);

  const submitTitleField = async (e: any) => {
    const value = e.target.value;

    if (value !== board.name && value?.length >= 2) {
      await dispatch(
        updateBoardAction({
          name: value,
          boardId: board._id,
        })
      );
    }

    setEdit(false);
  };

  return (
    <BoardTitleStyle>
      <ColorIcon
        size={"32px"}
        background-image={board?.image && `url(${board.image})`}
      />
      <div
        style={{
          marginLeft: "6px",
        }}
      >
        {edit ? (
          <Input
            defaultValue={board.name}
            ref={(input) => {
              if (input) {
                input.focus();
                setEdit(true);
              }
            }}
            onBlur={submitTitleField}
            onPressEnter={submitTitleField}
          />
        ) : (
          <p onClick={() => setEdit(true)}>{board.name}</p>
        )}
      </div>
    </BoardTitleStyle>
  );
};

export default BoardTitle;
