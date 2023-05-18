import React, { useState } from "react";
import { WorkSpaceCss, WorkSpaceMemberCss } from "./style";
import { Row, Col, Button, Divider } from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  LockOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { ColorIcon } from "@/components/Icons";
import { useParams } from "react-router-dom";
import InviteMember from "@/components/Modal/InviteMember";
import DeleteOrganization from "@/components/Modal/DeleteOrganization";
import type { PropsFromRedux } from "@/router";
import ManagePermission from "@/components/Modal/ManagePermission";
import { useAppSelector } from "@/hooks/useAppSelector";

const WorkSpaceSetting: React.FC<{
  setWorkSpace: PropsFromRedux["changeWorkSpace"];
  getOrganization: PropsFromRedux["getOrganization"];
}> = (props) => {
  const { getOrganization } = props;
  const { workSpaceId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openManagePermissionModal, setOpenManagePermissionModal] =
    useState(false);

  const currentUser = JSON.parse(localStorage.getItem("userData")!);

  const userOrganization = useAppSelector(
    (state) => state.user.organization
  ).find((ele) => ele._id === workSpaceId);

  const orgUser = userOrganization?.member.find(
    (user) => user.userId._id === currentUser._id
  );

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <Row>
          <ColorIcon
            color={"white"}
            text={userOrganization?.name[0] || ""}
            fontSize={"32px"}
            size={"72px"}
            background={"var(--blue)"}
          />
          <Col className="workSpace" style={{ marginLeft: "16px" }}>
            <Row align={"middle"} justify={"center"}>
              <h2>{userOrganization?.name}</h2>
              <Button
                style={{ width: "28px", background: "#F7F7F7", border: 0 }}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Row>
            {userOrganization?.permission === "private" && (
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
            icon={<UserAddOutlined />}
            style={{
              backgroundColor: "#232323",
              color: "white",
              width: "154px",
              height: "45px",
            }}
            onClick={() => setOpenInviteModal(true)}
          >
            邀請工作區成員
          </Button>
          <InviteMember
            open={openInviteModal}
            setOpen={setOpenInviteModal}
            organizationId={workSpaceId!}
          />
        </Col>
      </Row>
      <Divider />
      <WorkSpaceMemberCss>
        <Col>
          <h3 style={{ marginBottom: "36px" }}>工作區設定</h3>
          <h4
            style={{ fontWeight: "600", fontSize: "18px", lineHeight: "22px" }}
          >
            工作區觀看權限
          </h4>
          <Divider />
          <div className="intro-col">
            <Row
              align={"middle"}
              justify={"space-between"}
              style={{ marginTop: "16px" }}
            >
              <Col span={20}>
                {userOrganization?.permission === "private" ? (
                  <p style={{ lineHeight: "28px" }}>
                    <LockOutlined style={{ color: "red" }} /> 私密 <br />
                    這是私人工作區。此工作區沒有編入索引、也不開放工作區以外的成員觀看
                  </p>
                ) : (
                  <p style={{ lineHeight: "28px" }}>
                    <GlobalOutlined style={{ color: "green" }} /> 公開 <br />
                    這些是公開的工作區。任何擁有此連結的人皆可觀看這些工作區，同時這些工作區也會出現在搜尋引擎
                    (如 Google)
                    結果中。只有獲邀加入這些工作區的人員可以新增及編輯工作區看板。
                  </p>
                )}
              </Col>
              {orgUser?.role === "manager" && (
                <Col>
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "var(--black23)",
                      width: "62px",
                      height: "32px",
                    }}
                    onClick={() => setOpenManagePermissionModal(true)}
                  >
                    修改
                  </Button>
                </Col>
              )}
            </Row>
            <Button
              type="link"
              danger
              style={{
                padding: "0",
                marginTop: "48px",
              }}
              onClick={() => setOpenDeleteModal(true)}
            >
              要刪除此工作區嗎？
            </Button>
          </div>
        </Col>
        <DeleteOrganization
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          organizationId={workSpaceId!}
          getOrganization={getOrganization}
          userOrganization={userOrganization}
        />
        <ManagePermission
          open={openManagePermissionModal}
          setOpen={setOpenManagePermissionModal}
          organizationId={workSpaceId!}
          getOrganization={getOrganization}
          userOrganization={userOrganization}
        />
      </WorkSpaceMemberCss>
    </WorkSpaceCss>
  );
};

export default WorkSpaceSetting;
