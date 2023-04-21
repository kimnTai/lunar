import React from "react";
import { Sider } from "./style";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar: React.FC<{ showNavbar: boolean; openNav: Function }> = ({
  showNavbar,
  openNav,
}) => {
  const handleClosed = () => {
    openNav(true);
  };
  const handleOpen = () => {
    openNav(false);
  };
  return (
    <Sider
      collapsible
      collapsed={showNavbar}
      collapsedWidth={16}
      trigger={null}
    >
      {!showNavbar ? (
        <div className="title d-space">
          <div className="d-flex">
            <div className="colorBox"></div>
            <div>
              <span style={{ display: "block", lineHeight: "20px" }}>
                <Link to="" style={{ color: "white" }}>
                  <p>中5組</p>
                </Link>
              </span>
              <p style={{ display: "block", lineHeight: "20px" }}>
                Premium 方案
              </p>
            </div>
          </div>
          <Button
            icon={<LeftOutlined />}
            onClick={handleClosed}
            type="text"
            style={{ width: "28px", height: "28px", color: "white" }}
          />
        </div>
      ) : (
        <Button
          icon={<RightOutlined />}
          onClick={handleOpen}
          style={{
            width: "28px",
            height: "28px",
            color: "white",
            backgroundColor: "darkblue",
          }}
        />
      )}
    </Sider>
  );
};

export default Navbar;
