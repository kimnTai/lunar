
import React, { useState } from "react";
import { WorkSpaceCss } from "./style";
import { Row, Col, Button, Select } from "antd";
import { PlusOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { ColorIcon } from "@/components/Icons";
import { useParams } from "react-router-dom";
import { WorkSpaceCard } from "./WorkSpaceCard";
import { useSelector } from "react-redux";
import { OrganizationProps } from "@/interfaces/organization";
import { BoardsProps } from "@/interfaces/boards";
import AddBorards from "@/components/Modal/AddBorards";

const WorkSpace: React.FC<{
  setWrokSpace: Function;
  getOrganization: Function;
}> = (props) => {
  const { setWrokSpace, getOrganization } = props;
  const { workSpaceId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const userOrganization: OrganizationProps = useSelector(
    (state: any) => state.user.organization
  ).length
    ? useSelector((state: any) => state.user.organization).filter(
        (ele: OrganizationProps) => ele._id === workSpaceId
      )[0]
    : [];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <Row>
          <ColorIcon
            color={"white"}
            text={userOrganization.name[0]}
            fontSize={"32px"}
            size={"72px"}
            background={"var(--blue)"}
          />
          <Col className="workSpace" style={{ marginLeft: "16px" }}>
            <Row align={"middle"} justify={"center"}>
              <h2>{userOrganization.name}</h2>
              <Button
                style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Row>
            {userOrganization.permission === "private" && (
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
            )}
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
            onClick={() => setOpenModal(true)}
          >
            新增看板
          </Button>
          <AddBorards
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
