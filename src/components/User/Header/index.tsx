import React, { useState } from "react";
import { HeaderCss } from "./style";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Button, Badge, Avatar } from "antd";
import { DropdownBtn } from "@/components/DropdownBtn";
import { UserModal } from "./UserModal";

const items: MenuProps["items"] = [
  {
    label: "Submit and continue",
    key: "1",
  },
];

export const Header: React.FC<{
  workSpace: boolean;
}> = (props) => {
  const { workSpace } = props;
  const { avatar, name, email } = JSON.parse(localStorage.getItem("userData")!);
  //const [search, setSearch] = useState("");
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  return (
    <HeaderCss
      className="d-space"
      style={{ backgroundColor: workSpace ? "white" : "var(--black23)" }}
    >
      <div className="d-center">
        <div
          style={{
            display: workSpace ? "none" : "flex",
          }}
        >
          <DropdownBtn items={items} title={"工作區"}/>
          <DropdownBtn items={items} title={"最近的"} />
        </div>

        <Input
          className="search"
          placeholder="搜尋所有卡片"
          prefix={<SearchOutlined />}
          style={{}}
        />
      </div>
      <div className="d-center">
        <Badge size="default" count={5}>
          <Button
            icon={<BellOutlined />}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: 50,
              border: 0,
              background: "#F7F7F7",
            }}
            shape="circle"
          />
        </Badge>
        <Button
          type="text"
          onClick={() => {
            setUserModal(true);
          }}
          style={{
            display: "flex",
            padding: 0,
            marginLeft: "16px",
            alignItems: "center",
          }}
        >
          <Avatar src={avatar} />
          <p
            style={{ marginLeft: "8px", color: workSpace ? "black" : "white" }}
          >
            {name}
          </p>
        </Button>
        <UserModal
          open={userModal}
          setOpen={setUserModal}
          name={name}
          avatar={avatar}
          email={email}
        />
      </div>
    </HeaderCss>
  );
};
