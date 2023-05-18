import React, { useState } from "react";
import { WorkSpaceCss } from "./style";
import { Row, Col, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { WorkSpaceCard } from "./WorkSpaceCard";
import { useSelector } from "react-redux";
import { OrganizationProps } from "@/interfaces/organization";
import { BoardsProps } from "@/interfaces/boards";
import AddBoards from "@/components/Modal/AddBoards";
import type { PropsFromRedux } from "@/router";
import { WorkSpaceHeader } from "@/components/WorkSpace/WorkSpaceHeader";

const WorkSpace: React.FC<{
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
}> = (props) => {
  const { setWorkSpace, getOrganization } = props;
  const { workSpaceId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const userOrganization: OrganizationProps =
    useSelector((state: any) => state.user.organization).filter(
      (ele: OrganizationProps) => ele._id === workSpaceId
    )?.[0] ?? [];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <WorkSpaceHeader
          userOrganization={userOrganization}
          organizationId={workSpaceId!}
          getOrganization={getOrganization}
        />
        <Col>
          <Button
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#232323",
              color: "white",
              width: "121px",
              height: "45px",
            }}
            onClick={() => setOpenModal(true)}
          >
            新增看板
          </Button>
          <AddBoards
            open={openModal}
            setOpen={setOpenModal}
            organizationId={workSpaceId!}
            getOrganization={getOrganization}
          />
        </Col>
      </Row>

      <Row
        align={"middle"}
        justify={"space-between"}
        style={{ marginTop: "16px" }}
      >
        <Col style={{ fontWeight: 700, fontSize: "16px", lineHeight: "150%" }}>
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
      <Row style={{ marginTop: "16px", columnGap: "8px" }}>
        {userOrganization.board.length ? (
          userOrganization.board.map((ele: BoardsProps, idx: number) => (
            <WorkSpaceCard
              title={ele.name}
              privacy={ele.permission}
              backgroundUrl={""}
              setWorkSpace={setWorkSpace}
              getOrganization={getOrganization}
              id={ele._id}
              key={idx}
            />
          ))
        ) : (
          <></>
        )}
      </Row>
    </WorkSpaceCss>
  );
};

export default WorkSpace;
