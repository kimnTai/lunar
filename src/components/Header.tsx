import styled from "styled-components";
import HeaderLogo from "@/assets/images/img_logo.png";

const HeaderCss = styled.div`
  padding: 40px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 48px;
  color: white;
`;

const Header: React.FC = () => {
  return (
    <HeaderCss>
      <img src={HeaderLogo} alt="" />
      <span>註冊頁</span>
    </HeaderCss>
  );
};

export default Header;
