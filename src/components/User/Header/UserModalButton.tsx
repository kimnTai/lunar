import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { UserModalCss } from "./style";
import { logout, selectUser } from "@/redux/userSlice";

const UserModalButton: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const { avatar, name, email } = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Button
        type="text"
        onClick={() => setOpen(true)}
        style={{
          display: "flex",
          padding: 0,
          marginLeft: "16px",
          alignItems: "center",
        }}
      >
        <Avatar src={avatar} />
        <p
          style={{
            marginLeft: "8px",
            color: showWorkSpace ? "black" : "white",
          }}
        >
          {name}
        </p>
      </Button>
      <UserModalCss
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={272}
      >
        <Avatar src={avatar} style={{ width: "56px", height: "56px" }} />
        <p style={{ marginTop: "8px", color: "var(--black23)" }}>{name}</p>
        <p style={{ color: "var(--gray9f)" }}>{email}</p>
        <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
        <Button
          type="text"
          danger
          style={{ width: "100%" }}
          onClick={() => {
            dispatch(logout());
            if (import.meta.env.PROD) {
              window.location.href = `https://lunar-sigma.vercel.app/`;
            } else {
              navigate("/");
            }
          }}
        >
          登出
        </Button>
      </UserModalCss>
    </>
  );
};

export default UserModalButton;
