import { OrganizationMemberProps } from "@/interfaces/organization";
import { Avatar } from "antd";

const UserContent: React.FC<{ member: OrganizationMemberProps[] }> = ({
  member,
}) => {
  const boardManager = member?.filter(({ role }) => role === "manager");
  return (
    <div className="top-border" style={{ paddingBottom: 0 }}>
      {boardManager?.map(({ userId }) => (
        <div style={{ display: "flex" }} key={userId._id}>
          <Avatar src={userId.avatar} />
          <p style={{ marginTop: "5px", marginLeft: "5px" }}>{userId.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserContent;
