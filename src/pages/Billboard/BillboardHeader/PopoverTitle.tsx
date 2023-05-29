import { PopoverTitleProps } from "@/interfaces/boards";
import { PopoverTitleStyle } from "./style";
import { Button } from "antd";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";

const PopoverTitle: React.FC<PopoverTitleProps> = (props) => {
  const {
    isMenu,
    isUser,
    isSetting,
    isLabel,
    setIsMenu,
    setOpenPopover,
    setIsUser,
    setIsSetting,
    setIsLabel,
  } = props;
  const handleClick = () => {
    setOpenPopover(false);
    setIsUser(false);
    setIsSetting(false);
    setIsLabel(false);
    setIsMenu(true);
  };
  const previousClick = () => {
    setIsMenu(true);
    setIsUser(false);
    setIsSetting(false);
    setIsLabel(false);
  };

  return (
    <PopoverTitleStyle>
      {isMenu ? (
        <>
          選單
          <Button
            size="small"
            type="text"
            icon={
              <CloseOutlined
                style={{
                  color: "var(--gray66)",
                }}
              />
            }
            style={{ position: "absolute", right: 3 }}
            onClick={handleClick}
          />
        </>
      ) : null}
      {isUser ? (
        <>
          查看看板管理員
          <Button
            size="small"
            type="text"
            icon={
              <CloseOutlined
                style={{
                  color: "var(--gray66)",
                }}
              />
            }
            style={{ position: "absolute", right: 3 }}
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
      {isSetting ? (
        <>
          設定
          <Button
            size="small"
            type="text"
            icon={
              <CloseOutlined
                style={{
                  color: "var(--gray66)",
                }}
              />
            }
            style={{ position: "absolute", right: 3 }}
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
      {isLabel ? (
        <>
          標籤
          <Button
            size="small"
            type="text"
            icon={
              <CloseOutlined
                style={{
                  color: "var(--gray66)",
                }}
              />
            }
            style={{ position: "absolute", right: 3 }}
            onClick={handleClick}
          />
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={previousClick}
          />
        </>
      ) : null}
    </PopoverTitleStyle>
  );
};

export default PopoverTitle;
