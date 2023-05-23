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
        workSpace={showWorkSpace}
        setWorkSpace={changeWorkSpace}
        getOrganization={getOrganization}
      />
      <Layout>
        <Header workSpace={showWorkSpace} setWorkSpace={changeWorkSpace} />
        <MainLayoutCss workspace={showWorkSpace.toString()}>
          {children}
        </MainLayoutCss>
      </Layout>
    </Layout>
  );
});

export default LoginLayout;
