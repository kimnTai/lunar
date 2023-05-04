import React from "react";
import { Row, Col, Button, Select } from "antd";
import { WoarkSpaceCardCss } from "./style";
import { WoarkSpaceCardProps } from "@/interfaces/workspace";
import { LockOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const WorkSpaceCard: React.FC<WoarkSpaceCardProps> = ({
  title,
  privacy,
  backgroundUrl,
  setWrokSpace,
}) => {
  const navigate = useNavigate();

  return (
    <WoarkSpaceCardCss
      hoverable
      backgroundurl={backgroundUrl}
      onClick={() => {
        setWrokSpace("billboard");
        navigate("/board/6451de40d14c79f29ef99b74");
      }}
    >
      <Row style={{ marginBottom: "auto" }}>
        <Col style={{ fontWeight: 700, fontSize: "18px", lineHeight: "150%" }}>
          {title}
        </Col>
      </Row>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Button
            icon={<LockOutlined />}
            style={{ height: "29px", padding: "4px 8px" }}
            ghost
          >
            {privacy}
          </Button>
        </Col>
        <Col>
          <Button
            icon={<EllipsisOutlined />}
            type={"text"}
            style={{ color: "white" }}
          />
        </Col>
      </Row>
    </WoarkSpaceCardCss>
  );
};

export default WorkSpaceCard;
