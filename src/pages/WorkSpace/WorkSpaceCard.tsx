import React from "react";
import { Row, Col, Button, Skeleton } from "antd";
import { WorkSpaceCardCss } from "./style";
import { WorkSpaceCardProps } from "@/interfaces/workspace";
import { LockOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({
  title,
  privacy,
  backgroundUrl,
  setWorkSpace,
}) => {
  const navigate = useNavigate();

  return (
    <WorkSpaceCardCss
      hoverable
      backgroundurl={backgroundUrl}
      onClick={() => {
        setWorkSpace("billboard");
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
    </WorkSpaceCardCss>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <WorkSpaceCardCss
      backgroundurl={"none"}
      style={{ backgroundColor: "var(--grey9F)" }}
    >
      <Skeleton active />
    </WorkSpaceCardCss>
  );
};
