import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const openNotification = (
  title: string,
  description: string,
  success = true
) => {
  const useIcon = success ? (
    <CheckCircleOutlined style={{ color: "green" }} />
  ) : (
    <CloseCircleOutlined style={{ color: "red" }} />
  );
  notification.open({
    message: title,
    description,
    placement: "topRight",
    // duration: 0, // 持續時間 ,0:需手動關閉
    className: success ? "api-success" : "api-fail",
    icon: useIcon,
  });
};
