import React from "react";
import { useAppSelector } from "@/hooks";
import DropdownBtnGroup from "./DropdownBtnGroup";
import SearchCardInput from "./SearchCardInput";
import UserModalButton from "./UserModalButton";
import NotificationButton from "./NotificationButton";
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
        <DropdownBtnGroup />
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
