import { PopoverTitleProps } from "@/interfaces/boards";
import { PopoverTitleStyle } from "./style";
import { Button } from "antd";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";

const PopoverTitle: React.FC<PopoverTitleProps> = ({
  headerState,
  setHeaderState,
  setOpenPopover,
}) => {
  const handleClick = () => {
    setOpenPopover(false);
    setHeaderState("MENU");
  };
  const previousClick = () => {
    setHeaderState("MENU");
  };

  return (
    <PopoverTitleStyle>
      {headerState === "MENU" && (
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
      )}
      {headerState === "USER" && (
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
      )}
      {headerState === "SETTING" && (
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
      )}
      {headerState === "LABEL" && (
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
      )}
    </PopoverTitleStyle>
  );
};

export default PopoverTitle;
