import React from "react";
import { WorkSpaceCss, WoarkSpaceCardCss } from "./style";
import { Row, Col, Button, Select, Card } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  LockOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { WoarkSpaceCardProps } from "@/interfaces/workspace";

const WoarkSpaceCard: React.FC<WoarkSpaceCardProps> = ({
  title,
  privacy,
  backgroundUrl,
  setWrokSpace,
}) => {
  return (
    <WoarkSpaceCardCss
      hoverable
      backgroundurl={backgroundUrl}
      onClick={() => setWrokSpace("billboard")}
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

const WorkSpace: React.FC<{ setWrokSpace: Function }> = (props) => {
  const { setWrokSpace } = props;
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <Row>
          <div className="header-icon d-center">我</div>
          <Col className="workSpace" style={{ marginLeft: "16px" }}>
            <Row align={"middle"} justify={"center"}>
              <h2>我的工作區</h2>
              <Button
                style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Row>
            <Row
              align={"middle"}
              justify={"start"}
              style={{ marginTop: "8px" }}
            >
              <Button
                style={{ width: "69px", height: "29px" }}
                type="primary"
                danger
                ghost
                icon={<LockOutlined />}
              />
            </Row>
          </Col>
        </Row>
        <Col>
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#232323",
              color: "white",
              width: "121px",
              height: "45px",
            }}
          >
            新增看板
          </Button>
        </Col>
      </Row>

      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ marginTop: "16px" }}
      >
        <Col style={{ fontWeight: 700, fontSize: " 16px", lineHeight: "150%" }}>
          我的看板
        </Col>
        <Col>
          <Select
            defaultValue="排序方式"
            style={{ fontSize: "14px" }}
            onChange={handleChange}
            bordered={false}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <WoarkSpaceCard
            title={"UI / UX 前端網頁設計課程的筆記"}
            privacy={"私人"}
            backgroundUrl={""}
            setWrokSpace={setWrokSpace}
          />
        </Col>
      </Row>
    </WorkSpaceCss>
  );
};

export default WorkSpace;
