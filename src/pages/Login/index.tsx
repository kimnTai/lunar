import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/img_logo.png";
import { Card, Button, Divider, Form, Input } from "antd";
import GoogleIcon from "@/assets/images/google.png";
import GitHubIcon from "@/assets/images/GitHub.png";
import { LoginCss } from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { LoginProps } from "@/interfaces/user";
import ThirdPartyButton from "./ThirdPartyButton";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { loginAction, selectAuth, signInAction } from "@/redux/userSlice";
import { getOrganizationsAction } from "@/redux/organizationSlice";

const Login: React.FC = () => {
  const isSignUpPage = useLocation().pathname === "/signup";

  const isUserLogin = useAppSelector(selectAuth);
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLogin) {
      (async () => {
        await dispatch(getOrganizationsAction());
        navigate(`/`);
      })();
    }
  }, [isUserLogin]);

  const onFinish = (values: LoginProps) => {
    setButtonLoading(true);

    const action = isSignUpPage ? signInAction : loginAction;

    dispatch(action(values)).finally(() => {
      setButtonLoading(false);
    });
  };

  return (
    <LoginCss>
      <Outlet />
      <img className="header" src={Logo} alt="" />
      <Card>
        <h1 className="cardHeader">{isSignUpPage ? "免費註冊" : "登入"}</h1>
        <Form name="login-form" wrapperCol={{ span: 24 }} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "請輸入您的 Email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          {isSignUpPage && (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "請輸入您的帳號!",
                },
              ]}
            >
              <Input placeholder="帳號" />
            </Form.Item>
          )}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "請輸入您的密碼!",
              },
            ]}
          >
            <Input placeholder="密碼" type="password" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={buttonLoading}
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "48px",
                fontWeight: 700,
              }}
            >
              {isSignUpPage ? "註冊" : "登入"}
            </Button>
          </Form.Item>
        </Form>
        <div
          className="terms"
          style={{ display: isSignUpPage ? "block" : "none" }}
        >
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
          iconSrc={GoogleIcon}
          text={isSignUpPage ? "使用 Google 註冊" : "使用 Google 登入"}
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_REACT_API
            }/user/google`;
          }}
        />
        <ThirdPartyButton
          iconSrc={GitHubIcon}
          text={isSignUpPage ? "使用 GitHub 註冊" : "使用 GitHub 登入"}
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_REACT_API
            }/user/github`;
          }}
        />
        <div className="have-account">
          <div>已經有帳戶了嗎？</div>
          <div>
            <Button
              type="link"
              style={{ fontSize: "16px", padding: "0" }}
              onClick={() =>
                isSignUpPage ? navigate("/login") : navigate("/signup")
              }
            >
              {isSignUpPage ? "登入" : "註冊"}
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
