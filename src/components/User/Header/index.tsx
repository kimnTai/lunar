import React from "react";
import { useAppSelector } from "@/hooks";
import RecentBoardsBtn from "./Dropdown/RecentBoardsBtn";
import WorkSpaceBtn from "./Dropdown/WorkSpaceBtn";
import NotificationButton from "./NotificationButton";
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
        <NotificationButton />
        <UserModalButton />
      </div>
    </HeaderCss>
  );
};

export default Header;
