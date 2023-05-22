import React from "react";
import { UserModalCss } from "./style";
import { Avatar, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface UserModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  avatar: string;
  email: string;
}

export const UserModal: React.FC<UserModalProps> = ({
  open,
  setOpen,
  name,
  avatar,
  email,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <UserModalCss open={open} onCancel={handleCancel} footer={null} width={272}>
      <Avatar src={avatar} style={{ width: "56px", height: "56px" }} />
      <p style={{ marginTop: "8px", color: "var(--black23)" }}>{name}</p>
      <p style={{ color: "var(--gray9f)" }}>{email}</p>
      <Divider style={{ marginTop: "12px", marginBottom: "12px" }} />
      <Button
        type="text"
        danger
        style={{ width: "100%" }}
        onClick={() => {
          dispatch({ type: "LOGOUT" });
          navigate("/");
        }}
      >
        登出
      </Button>
    </UserModalCss>
  );
};
