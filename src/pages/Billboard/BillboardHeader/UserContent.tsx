import { useAppSelector } from "@/hooks";
import { selectBoardManagers } from "@/redux/boardSlice";
import { Avatar } from "antd";

const UserContent: React.FC = () => {
  const boardManager = useAppSelector(selectBoardManagers);
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
