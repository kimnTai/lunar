import React, { useState } from "react";
import { Button } from "antd";
import { VerticalLeftOutlined } from "@ant-design/icons";
import AddBoards from "@/components/Modal/AddBoards";
import AddWorkSpace from "@/components/Modal/AddWorkSpace";
import { useAppSelector } from "@/hooks";
import { selectShowWorkSpace } from "@/redux/screenSlice";
import BoardMenu from "./BoardMenu";
import NavbarTitle from "./NavbarTitle";
import WorkSpaceMenu from "./WorkSpaceMenu";
import { Sider } from "./style";

const Navbar: React.FC = () => {
  const showWorkSpace = useAppSelector(selectShowWorkSpace);
  const [showNavbar, setShowNavBar] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Sider
      width={257}
      collapsible={true}
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
      style={{
        backgroundColor: showWorkSpace ? "white" : "var(--black23)",
      }}
    >
      {showNavbar ? (
        <Button
          icon={<VerticalLeftOutlined />}
          onClick={() => setShowNavBar(false)}
          style={{
            width: "28px",
            height: "28px",
            marginTop: "16px",
            color: "var(--gray66)",
            backgroundColor: "var(--grayd4)",
          }}
        />
      ) : (
        <>
          <NavbarTitle setShowNavBar={setShowNavBar} />
          {showWorkSpace ? (
            <>
              <WorkSpaceMenu setOpen={setOpen} />
              <AddWorkSpace open={open} setOpen={setOpen} />
            </>
          ) : (
            <>
              <BoardMenu setOpen={setOpen} />
              <AddBoards open={open} setOpen={setOpen} />
            </>
          )}
        </>
      )}
    </Sider>
  );
};

export default Navbar;
