import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MenuProps, Spin } from "antd";
import { getRecentBoardsApi } from "@/api/user";
import { ColorIcon } from "@/components/Icons";
import { useAppSelector } from "@/hooks";
import { selectOrganization } from "@/redux/organizationSlice";
import DropdownBtn from "./DropdownBtn";

const RecentBoardsBtn: React.FC = () => {
  const navigate = useNavigate();
  const organization = useAppSelector(selectOrganization);

  const spinItem = [
    {
      label: <Spin />,
      key: "-1",
    },
  ];
  const [recentBoards, setRecentBoards] =
    useState<MenuProps["items"]>(spinItem);

  const onOpenChange = async (open: boolean) => {
    if (!open) {
      setRecentBoards(spinItem);
      return;
    }
    try {
      const { result } = await getRecentBoardsApi();
      const items = result.map(({ _id, name, image }) => ({
        key: _id,
        label: (
          <>
            <p>{name}</p>
            <p
              style={{
                color: `rgba(0, 0, 0, 0.45)`,
              }}
            >
              {
                organization.find(({ board }) =>
                  board.find((item) => item._id === _id)
                )?.name
              }
            </p>
          </>
        ),
        icon: (
          <ColorIcon
            color={"white"}
            text={""}
            size={"24px"}
            fontSize={"14px"}
            background={`linear-gradient(
                      112.89deg,
                      #0083ff 1.48%,
                      rgba(128, 0, 255, 0.86) 100%
                    )`}
            background-image={image && `url(${image})`}
          />
        ),
        onClick: () => {
          navigate(`/board/${_id}`);
          setRecentBoards(spinItem);
        },
      }));

      setRecentBoards(items);
    } catch (error) {}
  };

  return (
    <DropdownBtn
      title={"最近的"}
      items={recentBoards}
      onOpenChange={onOpenChange}
    />
  );
};

export default RecentBoardsBtn;
