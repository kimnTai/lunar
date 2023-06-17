import React, { useState } from "react";
import { Button, Col, Divider, Input, List, Menu, Row } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import InviteMember from "@/components/Modal/InviteMember";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import WorkSpaceHeader from "@/components/WorkSpace/WorkSpaceHeader";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import MemberListItem from "./Member/MemberListItem";
import { WorkSpaceCss, WorkSpaceMemberCss } from "./style";

const WorkSpaceMember: React.FC = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const userOrganization = useParamOrganization();

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
              defaultSelectedKeys={["workSpaceMember"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={[
                {
                  label: "工作區看板成員",
                  key: "g1",
                  type: "group",
                  children: [
                    {
                      label: "工作區成員",
                      key: "workSpaceMember",
                    },
                  ],
                },
              ]}
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
                  type="ORGANIZATION"
                  setOpen={setOpenInviteModal}
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
                renderItem={(member) => <MemberListItem member={member} />}
              />
            )}
          </Col>
        </Row>
      </WorkSpaceMemberCss>
    </WorkSpaceCss>
  );
};

export default WorkSpaceMember;
