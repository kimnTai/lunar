import { useState } from "react";
import { useNavigate } from "react-router";
import { MenuProps, Spin } from "antd";
import { getRecentBoardsApi } from "@/api/user";
import { useAppSelector } from "@/hooks";
import { selectOrganization } from "@/redux/organizationSlice";
import { selectShowWorkSpace } from "@/redux/screenSlice";
import DropdownBtn from "./DropdownBtn";

const DropdownBtnGroup: React.FC = () => {
  const showWorkSpace = useAppSelector(selectShowWorkSpace);
  const organization = useAppSelector(selectOrganization);

  const navigate = useNavigate();

  const spinItem = [
    {
      label: <Spin />,
      key: "-1",
    },
  ];

  const [recentBoards, setRecentBoards] =
    useState<MenuProps["items"]>(spinItem);

  return (
    <div
      style={{
        display: showWorkSpace ? "none" : "flex",
      }}
    >
      <DropdownBtn
        items={organization.map(({ _id, name }) => ({
          key: _id,
          label: (
            <a
              onClick={() => {
                navigate(`/workspace/${_id}/home`);
              }}
            >
              {name}
            </a>
          ),
        }))}
        title={"工作區"}
      />
      <DropdownBtn
        title={"最近的"}
        items={recentBoards}
        onOpenChange={async (open) => {
          if (!open) {
            setRecentBoards(spinItem);
            return;
          }
          try {
            const { result } = await getRecentBoardsApi();
            const items = result.map(({ _id, name }) => ({
              key: _id,
              label: (
                <a
                  onClick={() => {
                    navigate(`/board/${_id}`);
                    setRecentBoards(spinItem);
                  }}
                >
                  {name}
                </a>
              ),
            }));
            setRecentBoards(items);
          } catch (error) {}
        }}
      />
    </div>
  );
};

export default DropdownBtnGroup;
