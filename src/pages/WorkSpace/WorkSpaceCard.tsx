import React from "react";
import { Row, Col, Button, Skeleton, Popover } from "antd";
import { WorkSpaceCardCss } from "./style";
import { WorkSpaceCardProps } from "@/interfaces/workspace";
import {
  LockOutlined,
  EllipsisOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteBoardApi } from "@/api/boards";

export const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({
  title,
  privacy,
  backgroundUrl,
  setWorkSpace,
  getOrganization,
  id,
}) => {
  const navigate = useNavigate();

  const EllipsisAction: React.FC<{ id: string }> = ({ id }) => {
    return (
      <>
        <Button
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          分享看板
        </Button>
        <div></div>
        <Button
          danger
          type="text"
          onClick={async (e) => {
            e.stopPropagation();
            await deleteBoardApi(id);
            await getOrganization();
          }}
        >
          刪除看板
        </Button>
        <div style={{ color: "red" }}></div>
      </>
    );
  };
  return (
    <WorkSpaceCardCss
      hoverable
      backgroundurl={backgroundUrl}
      onClick={(_e) => {
        setWorkSpace();
        navigate(`/board/${id}`);
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
            icon={privacy === "private" ? <LockOutlined /> : <GlobalOutlined />}
            style={{ height: "29px", padding: "4px 8px" }}
            ghost
            className="d-center"
          >
            {privacy === "private" ? "私人" : "公開"}
          </Button>
        </Col>
        <Col>
          <Popover
            content={<EllipsisAction id={id} />}
            trigger="click"
            placement="bottomRight"
            arrow={false}
          >
            <Button
              icon={<EllipsisOutlined />}
              type={"text"}
              style={{ color: "white" }}
              className="EllipsisOutlined"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Popover>
        </Col>
      </Row>
    </WorkSpaceCardCss>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <WorkSpaceCardCss
      backgroundurl={"none"}
      style={{ backgroundColor: "var(--gray9f)" }}
    >
      <Skeleton active />
    </WorkSpaceCardCss>
  );
};
