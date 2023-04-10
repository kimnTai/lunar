import React from "react";
import styled from "styled-components";
import LoginBg from "@/assets/images/bg_createAccoun.png";
import Logo from "@/assets/images/logo.png";
import { Card, Button, Divider, Form, Input } from "antd";
import GoogleIcon from "@/assets/images/google.png";
import AppleIcon from "@/assets/images/apple.png";
import { LOGIN } from "@/redux/constants";
import { useNavigate } from "react-router-dom";

const LoginCss = styled.div`
  background: url(${LoginBg}) round;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  .ant-card-body {
    padding: 0;
  }
  .login-width {
    width: 354px;
  }
  .header {
    margin-bottom: 24px;
    text-align: center;
    img {
      display: block;
      margin: 0 auto;
    }
    span {
      margin-top: 12px;
      font-size: 16px;
    }
  }
  .ant-form-item {
    margin-bottom: 12px;
    input {
      height: 48px;
    }
  }
  .terms {
    color: var(--grey9F);
    text-align: center;
  }
  .have-account {
    margin-top: 32px;
    text-align: center;
    color: var(--grey66);
  }
`;

const ThirdPartyButtonCss = styled(Button)`
  width: 100%;
  font-size: 14px;
  margin-top: 8px;
  height: 44px;
  img {
    margin-right: 8px;
  }
  span {
    width: 144px;
  }
`;

const ThirdPartyButton: React.FC<{
  icon: any;
  text: string;
}> = ({ icon, text }) => {
  return (
    <ThirdPartyButtonCss icon={<img src={icon} alt="" />} className="d-center">
      {text}
    </ThirdPartyButtonCss>
  );
};

const Login: React.FC<{ loginAction: Function }> = ({ loginAction }) => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    loginAction({
      type: LOGIN,
      payload: values,
    });
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LoginCss className="d-center">
      <Card style={{ width: "542px", padding: "48px 94px" }}>
        <div className="header login-width">
          <img src={Logo} alt="" />
          <span>讓工作，更有序</span>
        </div>
        <ThirdPartyButton icon={GoogleIcon} text={"使用 Google 註冊"} />
        <ThirdPartyButton icon={AppleIcon} text={"使用 Apple 註冊"} />
        <Divider
          plain
          style={{ borderColor: "#D4D4D4", margin: "16px 0", height: "20px" }}
        >
          或
        </Divider>
        <Form
          name="login-form"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="帳號" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="密碼" type="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "48px" }}
            >
              註冊
            </Button>
          </Form.Item>
        </Form>
        <div className="terms">
          <div>點擊註冊表示您同意我們的</div>
          <div>
            <a href="">隱私政策</a>
            <span style={{ margin: "0 8px" }}>和</span>
            <a href="">服務條款</a>
          </div>
        </div>

        <div className="have-account">
          <div>已經有帳戶了嗎？</div>
          <div>
            <a href="">登入</a>
          </div>
        </div>
      </Card>
    </LoginCss>
  );
};

export default Login;
