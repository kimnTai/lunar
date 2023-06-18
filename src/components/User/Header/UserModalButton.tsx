import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, Spin, Upload } from "antd";
import { LoadingOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { logout, selectUser, updateProfileAction } from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import openNotification from "@/utils/openNotification";
import { UserModalCss } from "./style";

const UserModalButton: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const { avatar, name, email, _id } = useAppSelector(selectUser);

  const [open, setOpen] = useState(false);
  const [imgUploading, setImgUploading] = useState<boolean>(false);

  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;
    if (!file) return;

    if (file.status === "uploading") {
      setImgUploading(true);
    }

    if (file.status === "error") {
      setImgUploading(false);
      openNotification({
        message: "圖片上傳失敗",
        success: false,
      });
    }
  };

  const handleAvatarUpload = async (options: { file: any }) => {
    try {
      await dispatch(
        updateProfileAction({
          file: options.file,
          userId: _id,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setImgUploading(false);
    }
  };

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
      {/* 大頭照 */}
      <UserModalCss
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={272}
      >
        <div className="avatarSection">
          <ImgCrop>
            <Upload
              name="avatar"
              accept={`.png, .jpg`}
              onChange={handleUploadChange}
              customRequest={handleAvatarUpload}
              showUploadList={false}
              maxCount={1}
              className="avatar-uploader"
            >
              <div className="avatarBlock">
                <Avatar
                  size={64}
                  src={avatar ? avatar : null}
                  icon={avatar ? null : <UserOutlined />}
                  style={imgUploading ? { opacity: 0.3 } : {}}
                />
              </div>
              <Button type="primary" shape="circle" className="avatarUploadBtn">
                <PlusOutlined className="uploadIcon" />
              </Button>
            </Upload>
          </ImgCrop>

          {imgUploading && (
            <Spin indicator={<LoadingOutlined spin className="loading" />} />
          )}
        </div>

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
