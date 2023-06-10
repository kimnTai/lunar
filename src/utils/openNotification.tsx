import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ArgsProps } from "antd/es/notification/interface";

export default function openNotification(
  data: ArgsProps & { success?: boolean }
) {
  const success = data.success ?? true;
  const useIcon = success ? (
    <CheckCircleOutlined style={{ color: "green" }} />
  ) : (
    <CloseCircleOutlined style={{ color: "red" }} />
  );
  notification.open({
    ...data,
    placement: "topRight",
    // duration: 0, // 持續時間 ,0:需手動關閉
    className: success ? "api-success" : "api-fail",
    icon: useIcon,
  });
}
