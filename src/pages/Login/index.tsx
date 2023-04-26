import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/img_logo.png";
import { Card, Button, Divider, Form, Input } from "antd";
import GoogleIcon from "@/assets/images/google.png";
import AppleIcon from "@/assets/images/apple.png";
import { LoginCss, ThirdPartyButtonCss } from "./style";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const ThirdPartyButton: React.FC<{
  icon: any;
  text: string;
  handleClick: Function;
}> = ({ icon, text, handleClick }) => {
  return (
    <ThirdPartyButtonCss
      icon={<img src={icon} alt="" />}
      className="d-center"
      onClick={() => handleClick()}
    >
      {text}
    </ThirdPartyButtonCss>
  );
};

const Login: React.FC<{
  signInAction: Function;
  loginAction: Function;
  loginGoogle: Function;
  login: boolean;
}> = ({ signInAction, loginAction, loginGoogle, login }) => {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [signIn, setSignIn] = useState(true);
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    if (login) navigate("/");
  }, [login]);

  const onFinish = async (values: any) => {
    signIn ? await signInAction(values) : await loginAction(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const responseGoogle = async (response: any) => {
    await loginGoogle(response.xc.id_token);
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
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <ThirdPartyButton
              icon={GoogleIcon}
              text={signIn ? "使用 Google 註冊" : "使用 Google 登入"}
              handleClick={renderProps.onClick}
              // disabled={renderProps.disabled}
            />
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

        {/* <ThirdPartyButton
          icon={GoogleIcon}
          text={"使用 Google 註冊"}
          handleClick={() => {
            // loginGoogle()
            navigate("/api/user/google");
          }}
        /> */}
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
              onClick={() => setSignIn(!signIn)}
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
