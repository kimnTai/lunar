import React, { useCallback, useEffect } from "react";
import { WorkSpaceCss } from "./style";
import { Row, Col, Button, Select } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  LockOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { ColorIcon } from "@/components/Icons";
import { useParams } from "react-router-dom";
import WorkSpaceCard from "./WorkSpaceCard";

const WorkSpace: React.FC<{
  setWrokSpace: Function;
}> = (props) => {
  const { setWrokSpace } = props;
  const { userId } = useParams();
  console.log(userId);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <Row>
          <ColorIcon
            color={"white"}
            text={"我"}
            fontSize={"32px"}
            size={"72px"}
            background={"var(--blue)"}
          />
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
          <WorkSpaceCard
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
