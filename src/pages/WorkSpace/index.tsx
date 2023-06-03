import React, { useEffect, useState } from "react";
import { WorkSpaceCss } from "./style";
import { Row, Col, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import WorkSpaceCard from "./WorkSpaceCard";
import AddBoards from "@/components/Modal/AddBoards";
import { WorkSpaceHeader } from "@/components/WorkSpace/WorkSpaceHeader";
import { useAppDispatch } from "@/hooks";
import { changeWorkSpace } from "@/redux/screenSlice";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const WorkSpace: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  const userOrganization = useParamOrganization();

  const [filteredBoards, setFilteredBoard] = useState(userOrganization?.board);

  useEffect(() => {
    setFilteredBoard(userOrganization?.board);
  }, [userOrganization]);

  useEffect(() => {
    dispatch(changeWorkSpace(true));
  });
  const handleChange = (value: string) => {
    switch (value) {
      case "A-Z字母排序":
        return setFilteredBoard(
          [...filteredBoards!].sort((a, b) => a.name.localeCompare(b.name))
        );
      case "Z-A字母排序":
        return setFilteredBoard(
          [...filteredBoards!].sort((a, b) => b.name.localeCompare(a.name))
        );
      case "最近預覽":
        return setFilteredBoard(
          [...filteredBoards!].sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        );
      case "最新":
        return setFilteredBoard(
          [...filteredBoards!].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      case "最舊":
        return setFilteredBoard(
          [...filteredBoards!].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
    }
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <WorkSpaceHeader />
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
          <AddBoards open={openModal} setOpen={setOpenModal} />
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
              { value: "最近預覽", label: "最近預覽" },
              { value: "最新", label: "最新" },
              { value: "最舊", label: "最舊" },
              { value: "A-Z字母排序", label: "A-Z字母排序" },
              { value: "Z-A字母排序", label: "Z-A字母排序" },
            ]}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "16px", columnGap: "8px", rowGap: "24px" }}>
        {filteredBoards?.map((ele, idx) => (
          <WorkSpaceCard
            title={ele.name}
            permission={ele.permission}
            backgroundImage={ele.image}
            boardId={ele._id}
            key={idx}
          />
        ))}
      </Row>
    </WorkSpaceCss>
  );
};

export default WorkSpace;
