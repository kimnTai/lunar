import React from "react";
import { Button, Col, Row } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import InviteMember from "@/components/Modal/InviteMember";
import WorkSpaceHeader from "@/components/WorkSpace/WorkSpaceHeader";
import { useAppSelector } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { selectUser } from "@/redux/userSlice";

const OrganizationHeader: React.FC<{
  openInviteModal: boolean;
  setOpenInviteModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openInviteModal, setOpenInviteModal }) => {
  const currentUser = useAppSelector(selectUser);
  const userOrganization = useParamOrganization();
  const orgUser = userOrganization?.member.find(
    (user) => user.userId._id === currentUser._id
  );

  return (
    <Row align={"middle"} justify={"space-between"}>
      <WorkSpaceHeader />
      {orgUser?.role === "manager" && (
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
      )}
    </Row>
  );
};

export default OrganizationHeader;
