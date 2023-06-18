import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Upload,
} from "antd";
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
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [nameField, setNameField] = useState<string>(name);
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

  const submitUpdateProfile = async () => {
    setIsProfileSubmitting(true);

    try {
      await dispatch(
        updateProfileAction({
          name: nameField,
          userId: _id,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsProfileSubmitting(false);
      setOpenProfileEdit(false);
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

        <Row justify="center" align="middle" gutter={[0, 0]} wrap={true}>
          <Col span={24}>
            <p style={{ color: "var(--black23)" }}>{name}</p>
          </Col>
          <Col span={24}>
            <p style={{ color: "var(--gray9f)" }}>{email}</p>
          </Col>
          <Col span={24} className="updateProfileBtn">
            <Button
              type="primary"
              ghost
              onClick={() => setOpenProfileEdit(true)}
            >
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
        <Modal
          title={<div className="profileModalTitle">修改個人資料</div>}
          open={openProfileEdit}
          width={300}
          footer={null}
        >
          <Form name="basic" layout="vertical">
            <Form.Item label="使用者名稱">
              <Input
                size="middle"
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitUpdateProfile}
                loading={isProfileSubmitting}
                block
              >
                儲存
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </UserModalCss>
    </>
  );
};

export default UserModalButton;
