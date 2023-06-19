import { OrganizationMemberProps } from "@/interfaces/organization";
import { Avatar } from "antd";
import React from "react";
import AvatarCustom from "@/components/AvatarCustom";

const CardInnerMember: React.FC<{
  member: OrganizationMemberProps[];
}> = ({ member }) => {
  return (
    <>
      {member.map(({ userId: { _id, avatar, name } }) => (
        <Avatar.Group
          key={_id}
          style={{
            marginTop: "6px",
            position: "relative",
          }}
        >
          <AvatarCustom
            username={name}
            imgUrl={avatar}
            style={{
              marginRight: "-10px",
              left: "10px",
            }}
          />
        </Avatar.Group>
      ))}
    </>
  );
};

export default CardInnerMember;
