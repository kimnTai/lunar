import { ReactNode, useState } from "react";
import { Button, List, Popover, Spin } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import {
  deleteNotificationApi,
  getNotificationApi,
  updateNotificationApi,
} from "@/api/user";
import AvatarCustom from "@/components/AvatarCustom";
import type { NotificationProps } from "@/interfaces/notification";

const NotificationPopover: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [notificationList, setNotification] = useState<NotificationProps[]>([]);

  const onOpenChange = (visible: boolean) => {
    if (!visible) {
      setNotification([]);
      return;
    }
    setSpinning(true);

    getNotificationApi()
      .then(({ result }) => setNotification(result))
      .finally(() => setSpinning(false));
  };

  const handleRead = (notificationId: string) => {
    setNotification((pre) => {
      return pre.map((value) => ({
        ...value,
        isRead: value._id === notificationId ? true : value.isRead,
      }));
    });

    updateNotificationApi({
      notificationId,
      isRead: true,
    });
  };

  const handleRemove = (notificationId: string) => {
    setNotification((pre) => pre.filter(({ _id }) => _id !== notificationId));

    deleteNotificationApi({ notificationId });
  };

  const messageText = (item: NotificationProps) => {
    const [key, value] = Object.entries(item.data)[0];

    const target = `${
      {
        organization: "組織",
        board: "看板",
        card: "卡片",
      }[key]
    } ${value.name}`;

    if (item.type === "ADD_MEMBER") {
      return `已新增你至 : ${target}`;
    }
    if (item.type === "REMOVE_MEMBER") {
      return `已將你從 : ${target} 移除`;
    }
    if (item.type === "UPDATE_ROLE") {
      return `已將 ${target} 的權限修改為 ${
        {
          manager: "管理員",
          editor: "成員",
          viewer: "一般",
          "": "",
        }[value.role || ""]
      }`;
    }
  };

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      onOpenChange={onOpenChange}
      content={
        <Spin spinning={spinning}>
          <List
            bordered
            header={
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                通知
              </p>
            }
            dataSource={notificationList}
            pagination={{
              onChange: (_page) => {},
              pageSize: 8,
            }}
            renderItem={(item) => (
              <List.Item
                style={{
                  backgroundColor: !item.isRead ? "#D6F3FF" : "",
                }}
                actions={[
                  <Button
                    shape="circle"
                    size="small"
                    // FIXME: 塞一樣看不見的 icon，不然樣式會歪
                    icon={<MinusOutlined style={{ fontSize: 0 }} />}
                    style={{
                      backgroundColor: !item.isRead ? "#1EB4FF" : "",
                    }}
                    disabled={item.isRead}
                    onClick={() => handleRead(item._id)}
                  />,
                  <Button
                    danger
                    shape="circle"
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => handleRemove(item._id)}
                  />,
                ]}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AvatarCustom
                    username={item.sourceUserId.name}
                    imgUrl={item.sourceUserId.avatar}
                  />
                  <p
                    style={{
                      marginLeft: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.sourceUserId.name}
                  </p>
                </div>
                {messageText(item)}
              </List.Item>
            )}
          />
        </Spin>
      }
    >
      {children}
    </Popover>
  );
};

export default NotificationPopover;
