import React from "react";
import { Outlet } from "react-router";
import { Layout } from "antd";
import Header from "@/components/User/Header";
import Navbar from "@/components/User/Navbar";
import { useAppSelector } from "@/hooks";
import { MainLayoutCss } from "@/pages/Billboard/style";

const LoginLayout: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Header />
        <MainLayoutCss workspace={`${showWorkSpace}`}>
          <Outlet />
        </MainLayoutCss>
      </Layout>
    </Layout>
  );
};

export default React.memo(LoginLayout);
