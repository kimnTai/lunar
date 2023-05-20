import React, { useEffect } from "react";
import Logo from "@/assets/images/img_logo.png";
import { Card, Button, Divider, Form, Input } from "antd";
import GoogleIcon from "@/assets/images/google.png";
import AppleIcon from "@/assets/images/apple.png";
import { LoginCss } from "./style";
import { useNavigate } from "react-router-dom";
import type { LoginProps } from "@/interfaces/user";
import type { PropsFromRedux } from "@/router";
import ThirdPartyButton from "./ThirdPartyButton";

const Login: React.FC<{
  signInAction: PropsFromRedux["signInAction"];
  loginAction: PropsFromRedux["loginAction"];
  getOrganization: PropsFromRedux["getOrganization"];
  login: boolean;
  signIn: boolean;
}> = ({ signInAction, loginAction, getOrganization, login, signIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      //const id = JSON.parse(localStorage.getItem("userData")!)._id;
      // navigate(`/user/${id}/boards`);
      (async () => {
        await getOrganization();
        navigate(`/`);
      })();
    }
  }, [login]);

  const onFinish = async (values: LoginProps) => {
    signIn ? await signInAction(values) : await loginAction(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginCss>
      <img className="header" src={Logo} alt="" />
      <Card>
        <h1 className="cardHeader">{signIn ? "免費註冊" : "登入"}</h1>
        <Form
          name="login-form"
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
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
              {signIn ? "註冊" : "登入"}
            </Button>
          </Form.Item>
        </Form>
        <div className="terms" style={{ display: signIn ? "block" : "none" }}>
          <div>點擊註冊表示您同意我們的</div>
          <div>
            <a href="https://policies.google.com/privacy">隱私政策</a>
            <span style={{ margin: "0 8px" }}>和</span>
            <a href="https://policies.google.com/terms">服務條款</a>
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

        <ThirdPartyButton
          icon={GoogleIcon}
          text={signIn ? "使用 Google 註冊" : "使用 Google 登入"}
          handleClick={() => {
            window.location.href = `${
              import.meta.env.VITE_REACT_API
            }/user/google`;
          }}
        />
        <ThirdPartyButton
          icon={AppleIcon}
          text={signIn ? "使用 Apple 註冊" : "使用 Apple 登入"}
          handleClick={() => {}}
        />
        <div className="have-account">
          <div>已經有帳戶了嗎？</div>
          <div>
            <Button
              type="link"
              style={{ fontSize: "16px", padding: "0" }}
              // onClick={() => setSignIn(!signIn)}
              onClick={() =>
                signIn ? navigate("/login") : navigate("/signup")
              }
            >
              {signIn ? "登入" : "註冊"}
            </Button>
          </div>
        </div>
      </Card>
      <div className="contentText">
        <h3>讓工作，更有序</h3>
        <span>Simplify work and boost results.</span>
      </div>
    </LoginCss>
  );
};

export default Login;
