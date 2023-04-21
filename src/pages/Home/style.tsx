import styled from "styled-components";
import { Layout, Space } from "antd";

const { Header, Footer, Content } = Layout;

export const HomeCss = styled(Content)``;
export const HeaderCss = styled(Header)`
  height: 70px;
  background-color: white;
`;
export const FooterCss = styled(Footer)`
  background-color: gray;
  color: white;
`;

export const Section1Css = styled.section`
  background-color: gray;
  text-align: center;
  padding-top: 90px;
  height: calc(743px - 90px);
  h1 {
    font-size: 48px;
    line-height: 60px;
    font-weight: bold;
  }
  .textArea {
    font-size: 24px;
    margin-top: 21px;
    line-height: 30px;
  }
  img {
    width: 758px;
    height: 474px;
    background-color: green;
    margin-top: 60px;
  }
`;

export const Section2Css = styled.section`
  .text {
    line-height: 24px;
  }
  h2 {
    line-height: 60px;
    font-weight: bold;
    font-size: 36px;
  }
`;
