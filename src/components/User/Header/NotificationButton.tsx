import { useState } from "react";
import { Badge, Button, Checkbox, Popover, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks";
import {
  deleteNotificationApi,
  getNotificationApi,
  updateNotificationApi,
} from "@/api/user";
import type { NotificationProps } from "@/interfaces/notification";

const NotificationButton: React.FC = () => {
  const showWorkSpace = useAppSelector((state) => state.screen.showWorkSpace);
  const [spinning, setSpinning] = useState(false);
  const [notificationList, setNotification] = useState<NotificationProps[]>([]);

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      title="通知"
      onOpenChange={(visible) => {
        if (!visible) {
          setNotification([]);
          return;
        }
        setSpinning(true);

        getNotificationApi()
          .then(({ result }) => setNotification(result))
          .finally(() => setSpinning(false));
      }}
      content={
        <Spin spinning={spinning}>
          {notificationList.map(({ _id, isRead, type, sourceUserId, data }) => {
            return (
              <div key={_id}>
                <p>
                  <Checkbox
                    checked={isRead}
                    disabled={isRead}
                    onChange={({ target }) => {
                      setSpinning(true);
                      updateNotificationApi({
                        notificationId: _id,
                        isRead: target.checked,
                      })
                        .then(({ result }) => {
                          setNotification((pre) =>
                            pre.map((value) =>
                              value._id === result._id ? result : value
                            )
                          );
                        })
                        .finally(() => setSpinning(false));
                    }}
                  />
                  <>
                    {(() => {
                      const [key, value] = Object.entries(data)[0];
                      return `${sourceUserId.name}  ${type} ${
                        {
                          organization: "組織",
                          board: "看板",
                          card: "卡片",
                        }[key]
                      } ${value.name}`;
                    })()}
                  </>
                  <Button
                    onClick={() => {
                      setSpinning(true);
                      deleteNotificationApi({ notificationId: _id })
                        .then(({ result }) =>
                          setNotification((pre) =>
                            pre.filter((value) => value._id !== result._id)
                          )
                        )
                        .finally(() => setSpinning(false));
                    }}
                  >
                    X
                  </Button>
                </p>
              </div>
            );
          })}
        </Spin>
      }
    >
      <Badge>
        <Button
          icon={
            <BellOutlined
              style={{ color: showWorkSpace ? "#232323" : "#FFFFFF" }}
            />
          }
          style={{
            width: "36px",
            height: "36px",
            borderRadius: 50,
            border: 0,
            background: showWorkSpace ? "#F7F7F7" : "#666666",
          }}
          shape="circle"
        />
      </Badge>
    </Popover>
  );
};

export default NotificationButton;
