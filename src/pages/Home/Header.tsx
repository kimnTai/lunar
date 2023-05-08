import { HeaderCss } from "./style";
import Logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <HeaderCss>
      <Row justify="space-between">
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="" />
          <Link to="/">關於Lunar</Link>
          <Link to="/">功能介紹</Link>
          <Link to="/">聯繫我們</Link>
        </Col>
        <Col span={4} offset={8}>
          <Button onClick={handleLogin}>登入</Button>
          <Button>立即試用</Button>
        </Col>
      </Row>
    </HeaderCss>
  );
}
