import React from "react";
import { FooterCss } from "./style";
import Logo from "@/assets/images/logo.png";
import Github from "@/assets/images/Github.png";
import { Divider } from "antd";
import { Col, Row } from "antd";

const Footer: React.FC = () => {
  return (
    <FooterCss>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="" />
          <div>關於Lunar</div>
          <div>功能</div>
          <div>幫助</div>
        </Col>
      </Row>
      <Divider style={{ borderColor: "white" }} />
      <Row justify={"space-between"} align={"middle"}>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>@ 2023, Lunar All rights reserved</div>
          <div>隱私權</div>
          <div>條款政策</div>
        </Col>
        <Col
          span={2}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={Github} alt="" />
          <span>Github</span>
        </Col>
      </Row>
    </FooterCss>
  );
};

export default Footer;
