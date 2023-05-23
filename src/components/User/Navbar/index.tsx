import React, { useState, useEffect } from "react";
import { Sider } from "./style";
import { Button } from "antd";
import {
  VerticalRightOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "@/assets/images/logo.png";
import Logo2 from "@/assets/images/img_logo2.png";
import AddWorkSpace from "@/components/Modal/AddWorkSpace";
import NavBarMenu from "./NavbarMenu";
import AddBoards from "@/components/Modal/AddBoards";
import type { PropsFromRedux } from "@/router";
import { useAppSelector } from "@/hooks/useAppSelector";

export const Navbar: React.FC<{
  workSpace: boolean;
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
}> = ({ workSpace, setWorkSpace, getOrganization }) => {
  const [showNavbar, setShowNavBar] = useState(false);
  const navigate = useNavigate();
  const { boardId, workSpaceId } = useParams();
  const handleClosed = () => {
    setShowNavBar(true);
  };
  const handleOpen = () => {
    setShowNavBar(false);
  };
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState("");
  const userOrganization = useAppSelector((state) => state.user.organization);

  const currentOrganization = userOrganization.find(({ board }) =>
    board.map(({ _id }) => _id).includes(openKey)
  );
  useEffect(() => {
    if (!workSpace && boardId) {
      setOpenKey(boardId);
    }
  }, [workSpace, boardId]);

  return (
    <Sider
      width={257}
      collapsible
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
      style={{
        backgroundColor: workSpace ? "white" : "var(--black23)",
      }}
    >
      {!showNavbar ? (
        <>
          <div className="title d-space">
            {workSpace ? (
              <img src={Logo} className="logo" />
            ) : (
              <div className="logo-div">
                <Button
                  icon={<ArrowLeftOutlined style={{ fontSize: "16px" }} />}
                  type="link"
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "white",
                  }}
                  className="d-center"
                  onClick={() => {
                    setWorkSpace();
                    navigate("/");
                  }}
                />
                <img src={Logo2} className="logo2" />
              </div>
            )}
            <Button
              icon={<VerticalRightOutlined />}
              onClick={handleClosed}
              type="link"
              style={{
                width: "28px",
                height: "28px",
                color: "var(--gray9f)",
              }}
            />
          </div>
          {workSpace ? (
            <NavBarMenu
              workSpaceId={workSpaceId}
              workSpace={workSpace}
              data={userOrganization}
              setOpen={setOpen}
            />
          ) : (
            <>
              <NavBarMenu
                workSpace={workSpace}
                data={currentOrganization?.board || []}
                setOpen={setOpen}
                id={openKey}
              />
            </>
          )}
        </>
      ) : (
        <Button
          icon={<RightOutlined />}
          onClick={handleOpen}
          style={{
            width: "28px",
            height: "28px",
            color: "var(--gray9f)",
            backgroundColor: "darkblue",
          }}
        />
      )}
      {workSpace ? (
        <AddWorkSpace open={open} setOpen={setOpen} />
      ) : (
        <AddBoards
          open={open}
          setOpen={setOpen}
          organizationId={currentOrganization?._id || ""}
          getOrganization={getOrganization}
        />
      )}
    </Sider>
  );
};
