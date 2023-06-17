import { useState } from "react";
import { Avatar, Button, List, Skeleton } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ManageRole from "@/components/Modal/ManageRole";
import RemoveMember from "@/components/Modal/RemoveMember";
import { useAppSelector } from "@/hooks";
import { useParamOrganization } from "@/hooks/useParamOrganization";
import { OrganizationMemberProps } from "@/interfaces/organization";
import { selectUser } from "@/redux/userSlice";

const MemberListItem: React.FC<{ member: OrganizationMemberProps }> = ({
  member,
}) => {
  const [modalState, setModalState] = useState<"NONE" | "REMOVE" | "ROLE">(
    "NONE"
  );

  const currentUser = useAppSelector(selectUser);
  const userOrganization = useParamOrganization();
  const orgUser = userOrganization?.member.find(
    (user) => user.userId._id === currentUser._id
  );

  return (
    <>
      <List.Item
        actions={[
          <Button
            icon={<ExclamationCircleOutlined />}
            style={{
              backgroundColor: "white",
              color: "var(--black23)",
              padding: "4px 16px",
            }}
            onClick={() => {
              if (orgUser?.role === "manager") {
                setModalState("ROLE");
              }
            }}
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
            onClick={() => setModalState("REMOVE")}
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
      <ManageRole
        open={modalState === "ROLE"}
        setOpen={(_visible) => setModalState("NONE")}
        selectedMember={member}
      />
      <RemoveMember
        open={modalState === "REMOVE"}
        setOpen={(_visible) => setModalState("NONE")}
        selectedMember={member}
      />
    </>
  );
};

export default MemberListItem;
