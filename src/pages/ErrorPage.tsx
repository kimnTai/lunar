import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您訪問的頁面不存在。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            if (import.meta.env.PROD) {
              window.location.href = `https://lunar-sigma.vercel.app/`;
            } else {
              navigate("/");
            }
          }}
        >
          回到首頁
        </Button>
      }
    />
  );
};

export default ErrorPage;
