import { Navbar } from "@/components/User/Navbar";
import { useAppSelector } from "@/hooks";
import { MainLayoutCss } from "@/pages/Billboard/style";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import React, { ReactNode } from "react";

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
