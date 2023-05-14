import React, { useState } from "react";
import { WorkSpaceCss, WorkSpaceMemberCss } from "./style";
import {
  Row,
  Col,
  Button,
  Divider,
  Menu,
  Input,
  Avatar,
  List,
  Skeleton,
} from "antd";
import type { MenuProps } from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ColorIcon } from "@/components/Icons";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrganizationProps } from "@/interfaces/organization";
import { getMenuItem as getItem } from "@/utils/func";
import RemoveMember from "@/components/Modal/RemoveMember";
import { OrganizationMemberProps } from "@/interfaces/organization";
import ManageRole from "@/components/Modal/ManageRole";
import InviteMember from "@/components/Modal/InviteMember";

const items: MenuProps["items"] = [
  getItem(
    "工作區看板成員",
    "g1",
    null,
    [getItem("工作區成員（5）", "workSpaceMember")],
    "group"
  ),
];

const WorkSpaceMember: React.FC<{
  setWorkSpace: Function;
  getOrganization: Function;
}> = (props) => {
  const { getOrganization } = props;
  const { workSpaceId } = useParams();
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openManageRoleModal, setOpenManageRoleModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<OrganizationMemberProps | null>(null);

  const userOrganization: OrganizationProps =
    useSelector((state: any) => state.user.organization).filter(
      (ele: OrganizationProps) => ele._id === workSpaceId
    )?.[0] ?? [];

  const handleClick: MenuProps["onClick"] = (element) => {
    console.log(element);
  };

  const handleClickRemoveBtn = (member: OrganizationMemberProps) => {
    setSelectedMember(member);
    setOpenRemoveModal(true);
  };

  const handleClickManageBtn = (member: OrganizationMemberProps) => {
    setSelectedMember(member);
    setOpenManageRoleModal(true);
    console.log(member);
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
        <h3>成員</h3>
        <Row
          align={"top"}
          justify={"space-between"}
          style={{ marginTop: "16px" }}
        >
          <Col span={5}>
            <Menu
              onClick={handleClick}
              defaultSelectedKeys={["workSpaceMember"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Col>
          <Col span={18}>
            <div className="intro-col">
              <h4>工作區成員（5）</h4>
              <p>
                工作區成員可以查看及加入所有開放工作區觀看權限的看板，並在工作區中建立新看板。
              </p>
            </div>
            <Divider />
            <div className="intro-col">
              <h4>邀請成員加入你</h4>
              <Row
                align={"middle"}
                justify={"space-between"}
                style={{ marginTop: "16px" }}
              >
                <Col span={16}>
                  <p>
                    任何擁有邀請連結的人都可以加入此免費工作區。你也可以隨時停用並為此工作區建立新的邀請連結，並在工作區中建立新看板。
                  </p>
                </Col>
                <Col>
                  <Button
                    icon={<UserAddOutlined />}
                    style={{
                      backgroundColor: "white",
                      color: "var(--black23)",
                      width: "130px",
                      height: "32px",
                    }}
                    // onClick={() => setOpenRemoveModal(true)}
                  >
                    以連結邀請
                  </Button>
                </Col>
              </Row>
            </div>
            <Divider />
            <Col span={8}>
              <Input placeholder="依名字篩選" />
            </Col>
            <Divider />
            <List
              itemLayout="horizontal"
              dataSource={userOrganization.member}
              renderItem={(member: OrganizationMemberProps) => (
                <List.Item
                  actions={[
                    <Button
                      icon={<ExclamationCircleOutlined />}
                      style={{
                        backgroundColor: "white",
                        color: "var(--black23)",
                        padding: "4px 16px",
                      }}
                      onClick={() => handleClickManageBtn(member)}
                    >
                      {member.role === "manager" ? "管理員" : "成員"}
                    </Button>,

                    <Button
                      style={{
                        backgroundColor: "white",
                        color: "var(--black23)",
                        padding: "4px 16px",
                        textAlign: "center",
                      }}
                      onClick={() => handleClickRemoveBtn(member)}
                    >
                      {member.role === "manager" ? "退出" : "移除"}
                    </Button>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      avatar={<Avatar src={member.userId.avatar} />}
                      title={member.userId.name}
                      description={member.userId._id}
                    />
                  </Skeleton>
                  <ManageRole
                    open={openManageRoleModal}
                    setOpen={setOpenManageRoleModal}
                    organizationId={workSpaceId!}
                    getOrganization={getOrganization}
                    selectedMember={selectedMember}
                  />
                  <RemoveMember
                    open={openRemoveModal}
                    setOpen={setOpenRemoveModal}
                    organizationId={workSpaceId!}
                    getOrganization={getOrganization}
                    selectedMember={selectedMember}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </WorkSpaceMemberCss>
    </WorkSpaceCss>
  );
};

export default WorkSpaceMember;
