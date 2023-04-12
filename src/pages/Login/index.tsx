import React from "react";
import Logo from "@/assets/images/img_logo.png";
import { Card, Button, Divider, Form, Input } from "antd";
import GoogleIcon from "@/assets/images/google.png";
import AppleIcon from "@/assets/images/apple.png";
import { LOGIN } from "@/redux/constants";
import { useNavigate } from "react-router-dom";
import { LoginCss, ThirdPartyButtonCss } from "./style";
import Bg_blue from "@/assets/images/login_bg_blue.png";
import Bg_gray from "@/assets/images/login_bg_gray.png";
import Red_ball from "@/assets/images/red_ball.png";
import Blue_ball from "@/assets/images/blue_ball.png";

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
  const onFinish = (values: any) => {
    const navigate = useNavigate();
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
    <LoginCss>
      <img className="header" src={Logo} alt="" />
      <Card>
        <h1 className="cardHeader">免費註冊</h1>
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
              style={{
                width: "100%",
                height: "48px",
                fontWeight: 700,
              }}
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

        <Divider
          plain
          style={{
            borderColor: "#D4D4D4",
            margin: "12px 0px",
            height: "20px",
          }}
        >
          或
        </Divider>

        <ThirdPartyButton icon={GoogleIcon} text={"使用 Google 註冊"} />
        <ThirdPartyButton icon={AppleIcon} text={"使用 Apple 註冊"} />

        <div className="have-account">
          <div>已經有帳戶了嗎？</div>
          <div>
            <a href="" style={{ fontSize: "16px" }}>
              登入
            </a>
          </div>
        </div>
      </Card>
      <div className="contentText">
        <h3>讓工作，更有序</h3>
        <span>Simplify work and boost results.</span>
      </div>
      <div className="background">
        <img className="bg_blue" src={Bg_blue} alt="" />
        <img className="bg_gray" src={Bg_gray} alt="" />
        <img className="red_ball" src={Red_ball} alt="" />
        <img className="blue_ball" src={Blue_ball} alt="" />
      </div>
    </LoginCss>
  );
};

export default Login;
