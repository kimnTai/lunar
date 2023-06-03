import React, { ReactNode } from "react";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import Navbar from "@/components/User/Navbar";
import { useAppSelector } from "@/hooks";
import { MainLayoutCss } from "@/pages/Billboard/style";

const LoginLayout = React.memo<{
  children: ReactNode;
}>(({ children }) => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Header />
        <MainLayoutCss workspace={`${showWorkSpace}`}>{children}</MainLayoutCss>
      </Layout>
    </Layout>
  );
});

export default LoginLayout;
