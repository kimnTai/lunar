import { Navbar } from "@/components/User/Navbar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { MainLayoutCss } from "@/pages/Billboard/style";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import React, { ReactNode } from "react";
import { PropsFromRedux } from ".";

const LoginLayout = React.memo<{
  children: ReactNode;
  changeWorkSpace: PropsFromRedux["changeWorkSpace"];
}>(({ children, changeWorkSpace }) => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);

  return (
    <Layout>
      <Navbar setWorkSpace={changeWorkSpace} />
      <Layout>
        <Header />
        <MainLayoutCss workspace={`${showWorkSpace}`}>{children}</MainLayoutCss>
      </Layout>
    </Layout>
  );
});

export default LoginLayout;
