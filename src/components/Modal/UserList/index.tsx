import React from "react";
import AvatarCustom from "@/components/AvatarCustom";
import { OrganizationMemberProps } from "@/interfaces/organization";
import RemoveBoardMember from "./RemoveBoardMember";
import SelectBoardMember from "./SelectBoardMember";

const UserList: React.FC<OrganizationMemberProps> = (member) => {
  return (
    <div className="d-space" style={{ marginBottom: "12px" }}>
      <div className="d-flex">
        <AvatarCustom
          username={member.userId.name}
          imgUrl={member.userId.avatar}
          style={{ width: "40px", height: "40px" }}
        />
        <div style={{ marginLeft: "8px" }}>
          <div style={{ color: "var(--black23)" }}>{member.userId.name}</div>
          <div style={{ fontSize: "12px", color: "var(--gray9f)" }}>
            {member.userId.email}
          </div>
        </div>
      </div>
      <div className="d-flex" style={{ alignItems: "center" }}>
        <SelectBoardMember {...member} />
        <RemoveBoardMember {...member} />
      </div>
    </div>
  );
};

export default UserList;
