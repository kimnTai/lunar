import React, { useState } from "react";
import { Select } from "antd";
import { OrganizationMemberProps } from "@/interfaces/organization";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectBoard, updateBoardMembersAction } from "@/redux/boardSlice";

const SelectBoardMember: React.FC<OrganizationMemberProps> = (member) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const [spinning, setSpinning] = useState(false);

  const onChange = async (value: string) => {
    setSpinning(true);
    await dispatch(
      updateBoardMembersAction({
        boardId: board._id,
        memberId: member.userId._id,
        role: value,
      })
    );
    setSpinning(false);
  };

  return (
    <Select
      loading={spinning}
      defaultValue={member.role}
      style={{ width: "100px" }}
      size="large"
      options={[
        { value: "manager", label: "管理員" },
        { value: "editor", label: "成員" },
        { value: "viewer", label: "一般" },
      ]}
      onChange={onChange}
    />
  );
};

export default SelectBoardMember;
