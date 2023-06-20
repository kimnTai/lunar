import { OrganizationMemberProps } from "@/interfaces/organization";
import { Avatar } from "antd";
import React from "react";
import AvatarCustom from "@/components/AvatarCustom";
import { CardInnerMemberStyled } from "./style";

const CardInnerMember: React.FC<{
  member: OrganizationMemberProps[];
}> = ({ member }) => {
  return (
    <CardInnerMemberStyled>
      <Avatar.Group
        maxCount={2}
        size={"small"}
        maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {member.map(({ userId: { _id, avatar, name } }) => (
          <AvatarCustom username={name} imgUrl={avatar} size={24} key={_id} />
        ))}
      </Avatar.Group>
    </CardInnerMemberStyled>
  );
};

export default CardInnerMember;
