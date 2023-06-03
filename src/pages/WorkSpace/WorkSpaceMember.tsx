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
import { UserAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getMenuItem as getItem } from "@/utils/func";
import RemoveMember from "@/components/Modal/RemoveMember";
import { OrganizationMemberProps } from "@/interfaces/organization";
import ManageRole from "@/components/Modal/ManageRole";
import InviteMember from "@/components/Modal/InviteMember";
import { WorkSpaceHeader } from "@/components/WorkSpace/WorkSpaceHeader";
import { useAppSelector } from "@/hooks";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const items: MenuProps["items"] = [
  getItem(
    "工作區看板成員",
    "g1",
    null,
    [getItem("工作區成員", "workSpaceMember")],
    "group"
  ),
];

const WorkSpaceMember: React.FC = () => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openManageRoleModal, setOpenManageRoleModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<OrganizationMemberProps | null>(null);

  const currentUser = useAppSelector((state) => state.user.user);

  const userOrganization = useParamOrganization();

  const orgUser = userOrganization?.member.find(
    (user) => user.userId._id === currentUser._id
  );

  const handleClick: MenuProps["onClick"] = (element) => {
    console.log(element);
  };

  const handleClickRemoveBtn = (member: OrganizationMemberProps) => {
    setSelectedMember(member);
    setOpenRemoveModal(true);
  };

  const handleClickManageBtn = (member: OrganizationMemberProps) => {
    if (orgUser?.role === "manager") {
      setSelectedMember(member);
      setOpenManageRoleModal(true);
    }
  };

  const onCancel = () => {
    setOpenInviteModal(false);
  };

  const [userList, setUserList] = useState(userOrganization?.member);
  const handleSearchMember = (e: { target: { value: string } }) => {
    if (e.target.value !== "") {
      const filteredUser = userList?.filter((user) => {
        return user.userId.name.includes(e.target.value);
      });
      setUserList(filteredUser);
    } else {
      setUserList(userOrganization?.member);
    }
  };

  return (
    <WorkSpaceCss>
      <Row align={"middle"} justify={"space-between"}>
        <WorkSpaceHeader />
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
          <InviteMember open={openInviteModal} setOpen={setOpenInviteModal} />
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
              <h4>工作區成員（{userOrganization?.member.length}）</h4>
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
                <CopyInviteLinkBtn
                  userOrganization={userOrganization}
                  setOpen={onCancel}
                />
              </Row>
            </div>
            <Divider />
            <Col span={8}>
              <Input placeholder="依名字篩選" onChange={handleSearchMember} />
            </Col>
            <Divider />
            {userOrganization?.member && (
              <List
                style={{ height: "24vh", overflowY: "auto" }}
                itemLayout="horizontal"
                dataSource={userOrganization?.member}
                renderItem={(member) => (
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
                        description={member.userId.email}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            )}
            <ManageRole
              open={openManageRoleModal}
              setOpen={setOpenManageRoleModal}
              selectedMember={selectedMember}
            />
            <RemoveMember
              open={openRemoveModal}
              setOpen={setOpenRemoveModal}
              selectedMember={selectedMember}
            />
          </Col>
        </Row>
      </WorkSpaceMemberCss>
    </WorkSpaceCss>
  );
};

export default WorkSpaceMember;
