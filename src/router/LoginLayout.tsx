import { Navbar } from "@/components/User/Navbar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { MainLayoutCss } from "@/pages/Billboard/style";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import React, { ReactNode } from "react";
import { PropsFromRedux } from ".";

const LoginLayout = React.memo<{
  children: ReactNode;
  getOrganization: PropsFromRedux["getOrganization"];
  changeWorkSpace: PropsFromRedux["changeWorkSpace"];
}>(({ children, getOrganization, changeWorkSpace }) => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);

  return (
    <Layout>
      <Navbar
        setWorkSpace={changeWorkSpace}
        getOrganization={getOrganization}
      />
      <Layout>
        <Header setWorkSpace={changeWorkSpace} />
        <MainLayoutCss workspace={`${showWorkSpace}`}>{children}</MainLayoutCss>
      </Layout>
    </Layout>
  );
});

export default LoginLayout;
