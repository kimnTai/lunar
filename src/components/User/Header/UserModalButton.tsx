import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Spin, Upload } from "antd";
import {
  KeyOutlined,
  LoadingOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import {
  logout,
  resetPasswordAction,
  selectUser,
  updateProfileAction,
} from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import openNotification from "@/utils/openNotification";
import { ProfileEditModal, UserModalCss } from "./style";
import AvatarCustom from "@/components/AvatarCustom";

const UserModalButton: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const { avatar, name, email, _id } = useAppSelector(selectUser);

  const [open, setOpen] = useState(false);
  const [imgUploading, setImgUploading] = useState<boolean>(false);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [nameField, setNameField] = useState<string>(name);
  const [passwordField, setPasswordField] = useState<string>("");
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);

  //#region 大頭照
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
  //#endregion

  const handleOpenProfileEditModal = () => {
    setNameField(name);
    setPasswordField("");
    setOpenProfileEdit(true);
  };

  const submitUpdateProfile = async () => {
    setIsProfileSubmitting(true);

    try {
      if (nameField && nameField !== name) {
        await dispatch(
          updateProfileAction({
            name: nameField,
            userId: _id,
          })
        );
      }
      if (passwordField) {
        await dispatch(
          resetPasswordAction({
            password: passwordField,
            userId: _id,
          })
        );
      }
      setOpenProfileEdit(false);
    } catch (error) {
      // 更新失敗不會進 catch!?
      console.error(error);
    } finally {
      setIsProfileSubmitting(false);
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
        <AvatarCustom username={name} imgUrl={avatar} />
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
                <AvatarCustom
                  username={name}
                  imgUrl={avatar ? avatar : null}
                  style={{
                    width: "64px",
                    height: "64px",
                    ...(imgUploading && { opacity: 0.3 }),
                  }}
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

        <Row justify="center" align="middle" gutter={[0, 0]} wrap={true}>
          <Col span={24}>
            <p style={{ color: "var(--black23)" }}>{name}</p>
          </Col>
          <Col span={24}>
            <p style={{ color: "var(--gray9f)" }}>{email}</p>
          </Col>
          <Col span={24} className="updateProfileBtn">
            <Button type="primary" ghost onClick={handleOpenProfileEditModal}>
              修改個人資料
            </Button>
          </Col>
          <Col span={24}>
            <Button
              type="link"
              danger
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
          </Col>
        </Row>
        <ProfileEditModal
          title={<div className="profileModalTitle">修改個人資料</div>}
          open={openProfileEdit}
          onCancel={() => setOpenProfileEdit(false)}
          width={300}
          footer={null}
        >
          <Form name="basic" layout="vertical" onFinish={submitUpdateProfile}>
            <Form.Item label="使用者名稱">
              <Input
                type="text"
                size="middle"
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item label="新密碼">
              <Input
                type="password"
                size="middle"
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
                prefix={<KeyOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isProfileSubmitting}
                block
              >
                儲存
              </Button>
            </Form.Item>
          </Form>
        </ProfileEditModal>
      </UserModalCss>
    </>
  );
};

export default UserModalButton;
