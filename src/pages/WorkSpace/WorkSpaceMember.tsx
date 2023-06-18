import React, { useState } from "react";
import { Col, Divider, Input, List, Menu, Row } from "antd";
import CopyInviteLinkBtn from "@/components/WorkSpace/CopyInviteLinkBtn";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import MemberListItem from "./Member/MemberListItem";
import OrganizationHeader from "./OrganizationHeader.ts";
import { WorkSpaceCss, WorkSpaceMemberCss } from "./style";

const WorkSpaceMember: React.FC = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const userOrganization = useParamOrganization();
  const [keyword, setKeyWord] = useState("");
  const memberList = userOrganization?.member.filter((value) =>
    value.userId.name.includes(keyword)
  );

  return (
    <WorkSpaceCss>
      <OrganizationHeader
        openInviteModal={openInviteModal}
        setOpenInviteModal={setOpenInviteModal}
      />
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
              <Input
                placeholder="依名字篩選"
                onChange={(e) => {
                  setKeyWord(e.target.value);
                }}
              />
            </Col>
            <Divider />
            <List
              style={{ height: "24vh", overflowY: "auto" }}
              itemLayout="horizontal"
              dataSource={memberList}
              renderItem={(member) => <MemberListItem member={member} />}
            />
          </Col>
        </Row>
      </WorkSpaceMemberCss>
    </WorkSpaceCss>
  );
};

export default WorkSpaceMember;
