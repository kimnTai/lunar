import { BellOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";

const NotificationButton: React.FC = () => {
  return (
    <Badge size="default" count={5}>
      <Button
        icon={<BellOutlined />}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: 50,
          border: 0,
          background: "#F7F7F7",
        }}
        shape="circle"
      />
    </Badge>
  );
};

export default NotificationButton;
