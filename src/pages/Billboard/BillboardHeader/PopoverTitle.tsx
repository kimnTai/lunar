import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PopoverTitleProps } from "@/interfaces/boards";
import { PopoverTitleStyle } from "./style";

const PopoverTitle: React.FC<PopoverTitleProps> = ({
  headerState,
  setHeaderState,
  setOpenPopover,
}) => {
  const titleText = {
    MENU: "選單",
    USER: "查看看板管理員",
    SETTING: "設定",
    LABEL: "標籤",
    ARCHIVE: "封存",
  }[headerState];

  return (
    <PopoverTitleStyle>
      <>
        {titleText}
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
          onClick={() => {
            setOpenPopover(false);
            setHeaderState("MENU");
          }}
        />
        {headerState !== "MENU" && (
          <Button
            size="small"
            type="text"
            style={{ position: "absolute", left: -2, top: 2 }}
            icon={
              <LeftOutlined
                style={{ color: "var(--gray66)", fontSize: "16px" }}
              />
            }
            onClick={() => setHeaderState("MENU")}
          />
        )}
      </>
    </PopoverTitleStyle>
  );
};

export default PopoverTitle;
