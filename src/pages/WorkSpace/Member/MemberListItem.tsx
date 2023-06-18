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
              padding: "4px 16px",
            }}
            disabled={(() => {
              // 如果管理員剩下自己，不能修改自己權限
              if (
                userOrganization?.member.filter(
                  ({ role }) => role === "manager"
                )?.length === 1 &&
                member.userId._id === currentUser._id
              ) {
                return true;
              }
              // 管理員可以修改權限
              if (orgUser?.role === "manager") {
                return false;
              }
              return true;
            })()}
            onClick={() => setModalState("ROLE")}
          >
            {member.role === "manager" ? "管理員" : "成員"}
          </Button>,
          <Button
            style={{
              padding: "4px 16px",
              textAlign: "center",
            }}
            disabled={(() => {
              const managerList = userOrganization?.member.filter(
                ({ role }) => role === "manager"
              );
              // 如果管理員剩下自己，不能退出
              if (
                member.userId._id === currentUser._id &&
                managerList?.length === 1 &&
                managerList.find(({ userId }) => userId._id === currentUser._id)
              ) {
                return true;
              }
              // 組織剩一人不能退出
              if (userOrganization?.member.length === 1) {
                return true;
              }
              // 自己可以退出
              if (member.userId._id === currentUser._id) {
                return false;
              }
              // 管理員可以移除別人
              if (orgUser?.role === "manager") {
                return false;
              }
              return true;
            })()}
            onClick={() => setModalState("REMOVE")}
          >
            {member.userId._id === currentUser._id ? "退出" : "移除"}
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
