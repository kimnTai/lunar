import { ThirdPartyButtonCss } from "./style";

const ThirdPartyButton: React.FC<{
  icon: string;
  text: string;
  handleClick: React.MouseEventHandler;
}> = ({ icon, text, handleClick }) => {
  return (
    <ThirdPartyButtonCss
      icon={<img src={icon} alt="" />}
      className="d-center"
      onClick={handleClick}
    >
      {text}
    </ThirdPartyButtonCss>
  );
};

export default ThirdPartyButton;
