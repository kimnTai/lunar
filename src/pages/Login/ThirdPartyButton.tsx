import { ButtonProps } from "antd";
import { ThirdPartyButtonCss } from "./style";

const ThirdPartyButton: React.FC<
  ButtonProps & {
    text: string;
    iconSrc: string;
  }
> = (props) => {
  return (
    <ThirdPartyButtonCss
      {...props}
      icon={<img src={props.iconSrc} alt="" />}
      className="d-center"
    >
      {props.text}
    </ThirdPartyButtonCss>
  );
};

export default ThirdPartyButton;
