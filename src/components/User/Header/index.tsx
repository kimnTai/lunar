import React from "react";
import { Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks";
import RecentBoardsBtn from "./Dropdown/RecentBoardsBtn";
import WorkSpaceBtn from "./Dropdown/WorkSpaceBtn";
import NotificationPopover from "./NotificationPopover";
import SearchCardInput from "./SearchCardInput";
import UserModalButton from "./UserModalButton";
import { HeaderCss } from "./style";

const Header: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);

  return (
    <HeaderCss
      className="d-space"
      style={{
        backgroundColor: showWorkSpace ? "white" : "var(--black23)",
      }}
    >
      <div className="d-center">
        <div
          style={{
            display: showWorkSpace ? "none" : "flex",
          }}
        >
          <WorkSpaceBtn />
          <RecentBoardsBtn />
        </div>
        <SearchCardInput />
      </div>
      <div className="d-center">
        <NotificationPopover>
          <Badge>
            <Button
              icon={
                <BellOutlined
                  style={{ color: showWorkSpace ? "#232323" : "#FFFFFF" }}
                />
              }
              style={{
                width: "36px",
                height: "36px",
                borderRadius: 50,
                border: 0,
                background: showWorkSpace ? "#F7F7F7" : "#666666",
              }}
              shape="circle"
            />
          </Badge>
        </NotificationPopover>
        <UserModalButton />
      </div>
    </HeaderCss>
  );
};

export default Header;
