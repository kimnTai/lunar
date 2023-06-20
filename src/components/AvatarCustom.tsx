import React from "react";
import { Avatar, AvatarProps } from "antd";
import { stringToHSL } from "@/utils/func";

interface AvatarCustomProps extends AvatarProps {
  username: string;
  imgUrl?: string | null;
  style?: React.CSSProperties;
  size?: number;
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  username,
  imgUrl = null,
  ...props
}) => {
  const firstLetter = username.charAt(0).toUpperCase();
  const bgColor = stringToHSL({
    target: username,
    options: {
      hue: [180, 360],
      sat: [85, 100],
      lit: [60, 75],
    },
  });

  const getAvatarSrc = (imgUrl: string | null) => {
    if (!imgUrl || imgUrl === "https://i.imgur.com/tPmUQVM.png") {
      return null;
    } else {
      return imgUrl;
    }
  };

  return (
    <Avatar
      {...props}
      src={getAvatarSrc(imgUrl)}
      style={{
        backgroundColor: bgColor,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        border: 0,
        ...props.style,
      }}
    >
      {firstLetter}
    </Avatar>
  );
};

export default AvatarCustom;
