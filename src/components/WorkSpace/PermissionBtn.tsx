import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PermissionBtn: React.FC<{ permission: string; id: string | null }> = ({
  permission,
  id,
}) => {
  return (
    <Button
      icon={permission === "private" ? <LockOutlined /> : <GlobalOutlined />}
      style={{
        height: "29px",
        padding: "4px 8px",
        color: `${id ? "white" : permission === "private" ? "red" : "green"}`,
        borderColor: `${
          id ? "white" : permission === "private" ? "red" : "green"
        }`,
      }}
      ghost
      className="d-center"
    >
      {permission === "private" ? "私人" : "公開"}
    </Button>
  );
};

export default PermissionBtn;
