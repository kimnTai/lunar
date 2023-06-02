import { PopoverContentProps } from "@/interfaces/boards";
import ListButton from "@/components/ListButton";
import {
  InboxOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
          onClick={() => {}}
        />
      </div>
      <div className="top-border listBtn">
        <CloneBoardButton />
        <ListButton
          icon={
            <UploadOutlined style={{ fontSize: "20px", marginRight: "12px" }} />
          }
          text="分享"
          onClick={() => {}}
        />
      </div>
      <div className="top-border" style={{ paddingBottom: 0 }}>
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
