import {
  InboxOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ListButton from "@/components/ListButton";
import { PopoverContentProps } from "@/interfaces/boards";
import openNotification from "@/utils/openNotification";
import CloneBoardButton from "./CloneBoardButton";

const MenuContent: React.FC<Pick<PopoverContentProps, "setHeaderState">> = ({
  setHeaderState,
}) => {
  return (
    <>
      <div className="top-border listBtn">
        <ListButton
          icon={
            <UserOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="查看看板管理員"
          onClick={() => setHeaderState("USER")}
        />
        <ListButton
          icon={
            <SettingOutlined
              style={{ fontSize: "20px", marginRight: "12px" }}
            />
          }
          text="設定"
          onClick={() => setHeaderState("SETTING")}
        />
        <ListButton
          icon={
            <TagOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="標籤"
          onClick={() => setHeaderState("LABEL")}
        />
        <ListButton
          icon={
            <InboxOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="已封存的項目"
          onClick={() => setHeaderState("ARCHIVE")}
        />
      </div>
      <div className="top-border listBtn">
        <CloneBoardButton />
        <ListButton
          icon={
            <UploadOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="分享"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            openNotification({
              message: "已複製到剪貼簿",
            });
          }}
        />
      </div>
      <div
        className="top-border"
        style={{
          paddingBottom: 0,
          // TODO:退出? 關閉? 看板功能
          display: "none",
        }}
      >
        <ListButton
          icon={
            <LogoutOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="退出看板"
          danger={true}
        />
      </div>
    </>
  );
};

export default MenuContent;
