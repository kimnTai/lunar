import { useNavigate } from "react-router";
import { Button } from "antd";
import { ArrowLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import Logo from "@/assets/images/logo.png";
import Logo2 from "@/assets/images/img_logo2.png";
import { useAppSelector } from "@/hooks";
import { selectShowWorkSpace } from "@/redux/screenSlice";
import { useParamOrganization } from "@/hooks/useParamOrganization";

const NavbarTitle: React.FC<{
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowNavBar }) => {
  const navigate = useNavigate();
  const showWorkSpace = useAppSelector(selectShowWorkSpace);
  const organization = useParamOrganization();

  return (
    <div className="title d-space">
      {showWorkSpace ? (
        <img src={Logo} className="logo" />
      ) : (
        <div className="logo-div">
          <Button
            icon={<ArrowLeftOutlined style={{ fontSize: "16px" }} />}
            type="link"
            style={{
              width: "32px",
              height: "16px",
              color: "white",
            }}
            className="d-center"
            onClick={() => {
              navigate(`/workspace/${organization?._id}/home`);
            }}
          />
          <img src={Logo2} className="logo2" />
        </div>
      )}
      <Button
        icon={<VerticalRightOutlined style={{ fontSize: "16px" }} />}
        onClick={() => setShowNavBar((pre) => !pre)}
        type="link"
        style={{
          width: "28px",
          height: "28px",
          color: "var(--gray9f)",
        }}
      />
    </div>
  );
};

export default NavbarTitle;
